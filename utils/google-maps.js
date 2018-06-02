import googleMaps from '@google/maps';

require('dotenv').config();

const { GOOGLE_API_KEY } = process.env;

const googleMapsClient = googleMaps.createClient({
    key: GOOGLE_API_KEY,
    Promise
});

export async function fetchLocationDetails(location) {
    if (!location) {
        throw Error('No location supplied');
    }
    try {
        const searchResponse = await googleMapsClient.places({ query: location }).asPromise();
        const { place_id: placeid } = searchResponse.json.results[0];
        const detailsResponse = await googleMapsClient.place({ placeid }).asPromise();
        return detailsResponse.json.result;
    } catch (e) {
        console.error('Google Maps error!');
        console.error(e);
    }
}
