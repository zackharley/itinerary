import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/core';
import Airmoji from './Airmoji';

const styles = StyleSheet.create({
    placeContainer: {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: '#DBDBDB',
        paddingTop: 10,
        marginTop: 5,
    },
    placeHeader: {
        fontSize: 18,
        fontFamily: 'Circular Medium'
    },
    title: {
        fontFamily: 'Circular Medium',
        fontSize: 14,
        marginTop: 5
    },
    link: {
        fontFamily: 'Circular Book',
        fontSize: 12,
        color: '#008489',
        textDecoration: 'none',
    },
    text: {
        fontFamily: 'Circular Book',
        fontSize: 12,
    },
    row: {
        flexDirection: 'row',
    }
});

export default function Place({ place }) {
    return (
        <View style={styles.placeContainer}>
            <Text style={styles.placeHeader}>
                Where We're Staying
            </Text>
            <View>
                <Text style={styles.title}>{place.name}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>{place.type}</Text>
                </View>
                <Text style={styles.text}>{place.address.formatted_address}</Text>
                <Text style={styles.text}>{place.pointOfContactName}</Text>
                <Text style={styles.text}>{place.pointOfContactPhoneNumber}</Text>
                {/* TODO: add attachments  */}
            </View>
        </View>
    );
}