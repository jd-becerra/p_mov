import { ArtistResource } from "@/types/artist";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`;

function getMusicData() {
    console.log("FETCH URL: " + URL);
    console.log("process: " + process.env.EXPO_PUBLIC_API_KEY);
    return fetch(URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'     
        }
    })
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map((artist: ArtistResource) => {
        return {
            id: artist.mbid,
            name: artist.name,
            image: artist.image[0]['#text']
        }
    }))
}

export {getMusicData}
