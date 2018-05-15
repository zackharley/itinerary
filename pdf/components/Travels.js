import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/core';
import Travel from './Travel';

const styles = StyleSheet.create({
    travelsContainer: {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: '#DBDBDB',
        paddingTop: 10,
        marginVertical: 5,
    },
    travelsHeader: {
        fontSize: 18,
        fontFamily: 'Circular Medium'
    }
});

export default function Travels({ travels }) {
    if (!travels || travels.length === 0) {
        return null;
    }
    return (
        <View style={styles.travelsContainer}>
            <Text style={styles.travelsHeader}>
                Travel
            </Text>
            {travels.map(travel => <Travel key={travel.name} travel={travel}/>)}
        </View>
    );
}