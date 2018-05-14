import React from 'react';
import { Image, StyleSheet, Text, View } from '@react-pdf/core';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Circular Medium',
        fontSize: 14,
        marginTop: 5
    },
    text: {
        fontFamily: 'Circular Book',
        fontSize: 12,
    }
});

export default function Landmark({ landmark }) {
    return (
        <View>
            <Image src={landmark.photo.url} />
            <Text style={styles.title}>{landmark.name}</Text>
            <Text style={styles.text}>{landmark.address.formatted_address}</Text>
            <Text style={styles.text}>{landmark.description}</Text>
        </View>
    );
}
