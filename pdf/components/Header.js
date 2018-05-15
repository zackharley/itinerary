import React from 'react';
import moment from 'moment';
import { Image, StyleSheet, Text, View } from '@react-pdf/core';

const styles = StyleSheet.create({
    headerContainer: {},
    imageContainer: {
    },
    image: {
        width: '100%',
    },
    textContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 50,
        paddingTop: 10,
        // paddingBottom: 5,
    },
    title: {
        fontFamily: 'Circular Bold',
        fontSize: 22,
    },
    date: {
        fontFamily: 'Circular Book',
        fontSize: 10,
    }
});

export default function Header({ city, date }) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                       src={city.photo.url}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{city.name}</Text>
                <Text style={styles.date}>{moment(date).format('ddd, MMM DD')}</Text>
            </View>
        </View>
    );
}