import React from 'react';
import moment from 'moment';
import { StyleSheet, Text, View } from '@react-pdf/core';
import Airmoji from './Airmoji';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Circular Medium',
        fontSize: 14,
        marginTop: 5
    },
    text: {
        fontFamily: 'Circular Book',
        fontSize: 12,
    },
    row: {
        flexDirection: 'row'
    }
});

const TRAVEL_TYPE_AIRMOJIS = {
    bus: 'transportation_bus',
    flight: 'transportation_plane',
    train: 'transportation_transit'
};

export default function Travel({ travel }) {
    const travelTimeFormat = 'h:mmA';
    return (
        <View>
            <View style={styles.row}>
                <Airmoji name={TRAVEL_TYPE_AIRMOJIS[travel.type.toLowerCase()]}/>
                <Text style={styles.title}>{travel.type}</Text>
            </View>
            <Text style={styles.text}>{moment(travel.startTime).format(travelTimeFormat)} to {moment(travel.endTime).format(travelTimeFormat)}</Text>
            <Text style={styles.text}>{travel.startLocation.name} to {travel.endLocation.name}</Text>
            {/* TODO: could add more info about start/end locations, e.g. URL, address */}
            {/* TODO: add attachments */}
        </View>
    );
}
