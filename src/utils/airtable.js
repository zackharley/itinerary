import Airtable from 'airtable';
import { fetchLocationDetails } from './google-maps';

require('dotenv').config();

const { AIRTABLE_API_KEY, AIRTABLE_BASE, EVENTS_KEY, ITINERARY_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

export function fetchDailyItinerary(date) {
    const itineraryTable = base(ITINERARY_KEY);
    return new Promise((resolve, reject) => {
        return itineraryTable.select({
            fields: ['City', 'Date', 'Events', 'Landmarks', 'Notes', 'Places We\'re Staying', 'Travel'],
            filterByFormula: `DATETIME_DIFF(DATETIME_PARSE('${date}'), Date) = 0`,
            view: 'Grid view'
        }).firstPage(async (err, [record]) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                city: await fetchCity(record.fields.City[0]),
                date: record.fields.Date,
                events: await fetchEvents(record.fields.Events),
                landmarks: await fetchLandmarks(record.fields.Landmarks),
                notes: record.fields.Notes,
                place: await fetchPlaceWereStaying(record.fields['Places We\'re Staying'][0]),
                travels: await fetchTravels(record.fields.Travel)
            });
        });
    })
}

async function fetchEvents(eventIds = []) {
    return await Promise.all(eventIds.map(async id => await fetchEvent(id)))
}

function fetchEvent(eventId) {
    const eventsTable = base(EVENTS_KEY);
    return new Promise((resolve, reject) => {
        return eventsTable.find(eventId, async (err, event) => {
            if (err) {
                return reject(err);
            }

            return resolve({
                attachments: event.fields.Attachments,
                endTime: event.fields['End Time'],
                link: event.fields.Link,
                location: await fetchLocationDetails(event.fields.Location),
                name: event.fields.Name,
                startTime: event.fields['Start Time']
            });
        });
    });
}

function fetchCity(cityId) {
    const citiesTable = base('CITIES');
    return new Promise((resolve, reject) => {
        return citiesTable.find(cityId, (err, city) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                name: city.fields.Name,
                photo: city.fields.Photo[0],
                tourismWebsite: city.fields['Tourism Website']
            });
        });
    });
}

async function fetchLandmarks(landmarkIds = []) {
    return await Promise.all(landmarkIds.map(async id => await fetchLandmark(id)))
}

function fetchLandmark(landmarkId) {
    const landmarksTable = base('Landmarks');
    return new Promise((resolve, reject) => {
        return landmarksTable.find(landmarkId, async (err, landmark) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                address: await fetchLocationDetails(landmark.fields.Address),
                description: landmark.fields.Description,
                name: landmark.fields.Name,
                photo: landmark.fields.Photo[0]
            });
        });
    });
}

async function fetchTravels(travelIds = []) {
    return await Promise.all(travelIds.map(async id => await fetchTravel(id)))
}

function fetchTravel(travelId) {
    const travelsTable = base('Train, Planes, and Automobiles');
    return new Promise((resolve, reject) => {
        return travelsTable.find(travelId, async (err, travel) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                attachments: travel.fields.Attachments,
                endLocation: await fetchLocationDetails(travel.fields['End Location']),
                endTime: travel.fields['End Time'],
                name: travel.fields.Name,
                startLocation: await fetchLocationDetails(travel.fields['Start Location']),
                startTime: travel.fields['Start Time'],
                type: travel.fields.Type
            });
        });
    });
}

function fetchPlaceWereStaying(placeId) {
    const placesTable = base('Places We\'re Staying');
    return new Promise((resolve, reject) => {
        return placesTable.find(placeId, async (err, place) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                address: await fetchLocationDetails(place.fields.Address),
                attachments: place.fields.Attachments,
                name: place.fields.Name,
                pointOfContactName: place.fields['PoC Name'],
                pointOfContactPhoneNumber: place.fields['PoC Phone Number'],
                type: place.fields.Type,
            });
        });
    });
}

