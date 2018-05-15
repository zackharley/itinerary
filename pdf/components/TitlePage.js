import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/core';

// TODO: PropTypes

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Circular Medium',
        fontSize: 30
    },
});

export default function Itinerary({ title }) {
    return (
        <Document>
            <Page size="A4" wrap>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Page>
        </Document>
    );
}
