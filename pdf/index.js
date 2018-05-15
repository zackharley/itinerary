import React from 'react';
import request from 'request';
import fs from 'fs';
import _ from 'lodash';
import tempfile from 'tempfile';
import ReactPDF from '@react-pdf/node';
import PDFMerge from 'pdf-merge';
import { Font } from '@react-pdf/core';
import { AirmojiReference, Itinerary, TitlePage } from './components';
import { fetchDailyItinerary } from './utils/airtable';

import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../dist');
const OUTPUT_FILENAME = 'itinerary.pdf';
const FONTS_DIR = path.resolve(__dirname, './assets/fonts');
const FONTS = {
    'Circular Black': 'CircularStd/CircularStd-Black.ttf',
    'Circular Black Italic': 'CircularStd/CircularStd-BlackItalic.ttf',
    'Circular Bold': 'CircularStd/CircularStd-Bold.ttf',
    'Circular Bold Italic': 'CircularStd/CircularStd-BoldItalic.ttf',
    'Circular Book': 'CircularStd/CircularStd-Book.ttf',
    'Circular Book Italic': 'CircularStd/CircularStd-BookItalic.ttf',
    'Circular Medium': 'CircularStd/CircularStd-Medium.ttf',
    'Circular Medium Italic': 'CircularStd/CircularStd-MediumItalic.ttf',
    'Airmoji': 'Airmoji/airmojix-Regular-d6dee9123269338ba773518a6f1b9f88.ttf',
};

// generateItinerary({ date: '2018-06-04' }).catch(console.error);

export async function generateItinerary({ date } = {}) {
    const itinerary = await fetchDailyItinerary(date);

    // await ReactPDF.render(
    //     <AirmojiReference/>,
    //     path.join(OUTPUT_DIR, 'airmoji-reference.pdf')
    // );

    registerFonts();

    const pdfs = [
        await generateOverviewPdf(itinerary),
        ...(await generateEventsAttachmentsPdfs(itinerary)),
        ...(await generatePlaceAttachmentsPdfs(itinerary)),
        ...(await generateTravelsAttachmentsPdfs(itinerary)),
    ];
    return await generateCombinedPdf(pdfs, OUTPUT_FILENAME);
}

function registerFonts() {
    _.forEach(
        FONTS,
        (src, family) => Font.register(path.join(FONTS_DIR, src), { family })
    );
}


async function generateOverviewPdf(itinerary) {
    const itineraryFile = tempfile('.pdf');
    await ReactPDF.render(
        <Itinerary itinerary={itinerary}/>,
        itineraryFile
    );
    return itineraryFile;
}

async function generateEventsAttachmentsPdfs(itinerary) {
    const title = 'Events';
    return await generateAttachmentsPdfs(itinerary.events, title, { isNested: true });
}

async function generatePlaceAttachmentsPdfs(itinerary) {
    const title = 'Places We\'re Staying';
    return await generateAttachmentsPdfs(itinerary.place, title);
}

async function generateTravelsAttachmentsPdfs(itinerary) {
    const title = 'Travel';
    return await generateAttachmentsPdfs(itinerary.travels, title, { isNested: true });
}

async function generateAttachmentsPdfs(field, title, options = {}) {
    const attachments = getAttachments(field, options.isNested);

    if (attachments.length > 0) {
        const titlePageFile = tempfile('.pdf');
        const downloadedAttachments = await downloadFiles(attachments);
        await ReactPDF.render(
            <TitlePage title={title}/>,
            titlePageFile
        );
        return [
            titlePageFile,
            ...downloadedAttachments
        ];
    } else {
        return [];
    }
}

function getAttachments(field, isNested) {
    if (isNested) {
        return _.flatten(field.map(a => getAttachments(a)));
    }
    return field.attachments.map(attachment => attachment.url);
}

async function downloadFiles(attachments) {
    if (!attachments || attachments.length === 0) {
        return [];
    }
    return await Promise.all(
        attachments.map(
            url => downloadFile(url, String(url.split('/').slice(-1)))
        )
    );
}

function downloadFile(url, filename) {
    const downloadPath = tempfile(filename.split('.'.slice(-1)));
    return new Promise((resolve, reject) => request(url)
        .pipe(fs.createWriteStream(downloadPath))
        .on('close', () => {
            console.log(`Downloaded file ${url} to ${downloadPath}`);
            return resolve(downloadPath);
        })
        .on('error', reject)
    );
}

async function generateCombinedPdf(files, filename) {
    // const combinedFile = path.resolve(OUTPUT_DIR, filename);
    const combinedFile = tempfile('.pdf');
    await PDFMerge(files, { output: combinedFile });
    console.log('Combined PDF created!');
    return combinedFile;
}
