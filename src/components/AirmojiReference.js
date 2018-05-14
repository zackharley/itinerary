import React from 'react';
import { Page, View, Document, Text, StyleSheet } from '@react-pdf/core';
import Airmoji, { AIRMOJIS } from './Airmoji';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        marginLeft: 10,
        fontSize: 12
    }
});

export default function AirmojiReference() {
    return (
        <Document>
            <Page wrap size="2A0">
                {AIRMOJIS.map(airmoji => (
                    <View style={styles.container}>
                        <Airmoji name={airmoji.serverName} />
                        <Text style={styles.text}>{airmoji.humanReadableName}, {airmoji.serverName}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
}


