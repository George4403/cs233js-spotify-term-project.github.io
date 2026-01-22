import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifyArtistSearchRequest from "spotify/request/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import { getPreviousSearchNameFromUrl } from "../utils/url.js";
import { saveSearch } from "../utils/storage.js";
import ChartToppers from "./ChartToppers";
import Form from "./Form";
import { setState, getState } from "../utils/react.js";



let client;
// Initialize the Spotify client
window.initializeClient = initializeClient;

initializeClient();
// Function to initialize the Spotify client
function initializeClient() {
    // Spotify API Credentials
    const clientID = "4c15e19067fd4e66b8b075a6e53839ab";
    const clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";
    // Initialize the Spotify HTTP client with the provided credentials
    client = new SpotifyHttpClient(clientID, clientSecret);
}




export default function Search({ artistName }) {


    let tracks = getState("tracks");



    async function handleSubmit(event) {
        event.preventDefault();
        // extract artist name from form
        let form = event.currentTarget;
        let data = new FormData(form);
        const artistName = data.get("artist")?.trim();

        setState("artistName", artistName);

        if (!artistName || artistName === "") return;
        // search for the artist
        saveSearch(artistName);

        // Initialize search and artist requests with the access token
        const searchRequest = new SpotifyArtistSearchRequest(artistName);
        const tracksRequest = new SpotifyArtistRequest();

        // Send search request
        const artists = await client.send(searchRequest);
        const artist = artists[0];

        tracksRequest.setArtistID(artist.getId());

        const topTracks = await client.send(tracksRequest);
        setState("tracks", topTracks);
    }

    // render search results`
    const searchResultsContainer = document.createElement("div");
    searchResultsContainer.appendChild(
        Form({ onSubmit: handleSubmit, artistName: getState("artistName") }),
    );
    searchResultsContainer.appendChild(ChartToppers({ tracks }));
    return searchResultsContainer;
}
/*let topTracks = [];

        try {
            // Send search request
            const artists = await client.send(searchRequest);
            const artist = artists[0];

            tracksRequest.setArtistID(artist.getId());

            topTracks = await client.send(tracksRequest);
            // Display the top tracks.
            this.topTenChart(topTracks);
        } catch (error) {
            this.displayError(error);
            return;
        } */
