import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/core';
import Event from './Event';

const styles = StyleSheet.create({
    landmarksContainer: {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: '#DBDBDB',
        paddingTop: 10,
        marginVertical: 5,
    },
    landmarksHeader: {
        fontSize: 18,
        fontFamily: 'Circular Medium'
    }
});

export default function Events({ events }) {
    if (!events || events.length === 0) {
        return null;
    }
    return (
        <View style={styles.landmarksContainer}>
            <Text style={styles.landmarksHeader}>
                Events
            </Text>
            {events.map(event => <Event key={event.name} event={event}/>)}
        </View>
    );
}