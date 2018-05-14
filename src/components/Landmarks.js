import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/core';
import Landmark from './Landmark';

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

export default function Events({ landmarks }) {
    if (!landmarks || landmarks.length === 0) {
        return null;
    }
    return (
        <View style={styles.landmarksContainer}>
            <Text style={styles.landmarksHeader}>
                Landmarks
            </Text>
            {landmarks.map(landmark => <Landmark key={landmark.name} landmark={landmark}/>)}
        </View>
    );
}