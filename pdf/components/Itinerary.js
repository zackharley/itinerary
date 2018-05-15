import React from 'react';
import { Document, Page, StyleSheet, View } from '@react-pdf/core';
import Header from './Header';
import Events from './Events';
import Landmarks from './Landmarks'
import Travels from './Travels';
import Place from './Place';

// TODO: PropTypes

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 50,
    }
});

export default function Itinerary({ itinerary: { city, date, events, landmarks, notes, place, travels } }) {
    return (
        <Document>
            <Page size="A4" wrap>
                <Header city={city} date={date}/>
                <View style={styles.mainContainer}>
                    <Travels travels={travels} />
                    <Place place={place} />
                    <Events events={events}/>
                    <Landmarks landmarks={landmarks}/>
                </View>
            </Page>
        </Document>
    );
}
