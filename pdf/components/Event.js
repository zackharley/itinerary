import React from 'react';
import moment from 'moment-timezone';
import { Link, StyleSheet, Text, View } from '@react-pdf/core';
import Airmoji from "./Airmoji";

const styles = StyleSheet.create({
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
        flexDirection: 'row'
    }
});

export default function Event({ event }) {
    const eventTimeFormat = 'h:mmA';
    return (
        <View>
            <View style={styles.row}>
                <Airmoji name="tickets_ticket"/>
                <Text style={styles.title}>{event.name}</Text>
            </View>
            <Link src={event.link} style={styles.link}>Event Webpage</Link>
            <Text style={styles.text}>{moment(event.startTime).format(eventTimeFormat)}
                to {moment(event.endTime).format(eventTimeFormat)}</Text>
            <Text style={styles.text}>{event.location.name}, {event.location.formatted_address}</Text>
            <Link src={event.location.website} style={styles.link}>Event Location Website</Link>
            <Link src={event.location.url} style={styles.link}>View on Google Maps</Link>
            {/*<Text>{event.cost}</Text>*/}
            <Text style={styles.text}>{event.notes}</Text>
            {/*<Text>{JSON.stringify(event.attachments, null, 2)}</Text>*/}
        </View>
    );
}
