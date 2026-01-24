import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifySearchRequest from "spotify/request/SpotifySearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import { getPreviousSearchNameFromUrl } from "../utils/url.js";
import { saveSearch } from "../utils/storage.js";
import ChartToppers from "./ChartToppers";
import Form from "./Form";
import { setState, getState, useEffect } from "../utils/react.js";
import { SpotifyArtist } from "spotify/models/SpotifyArtist.js";

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

let processedUrlArtist = null;

function extractArtistFromUrl() {
    /*
    const urlParams = new URLSearchParams(window.location.search);
    const artistFromUrl = urlParams.get("artist");

    // If there's an artist in the URL and we haven't processed this specific artist yet, perform the search
    if (artistFromUrl && artistFromUrl !== processedUrlArtist) {
        processedUrlArtist = artistFromUrl;
        // Clear the URL parameter immediately to prevent re-triggering on re-render
        window.history.replaceState({}, "", "/");
        setState("artistName", artistFromUrl);
        performSearch(artistFromUrl);
    } */
    const pathname = new URL(window.location.href).pathname;
    const artistFromUrl = decodeURIComponent(
        pathname.split("/artist/")[1] || "",
    ).trim();
    return artistFromUrl;
}

export default function Search({ artistName }) {
    let tracks = getState("tracks");

    // Try to extract artist name from URL
    artistName = extractArtistFromUrl();

    if (artistName) {
        setState("artistName", artistName);
        useEffect(() => {
            performSearch(artistName);
        }, [artistName]);
    }

    async function performSearch(artistName) {
        if (!artistName || artistName === "") return;

        // search for the artist
        saveSearch(artistName);

        // Initialize search and artist requests with the access token
        const searchRequest = new SpotifySearchRequest(artistName);
        const tracksRequest = new SpotifyArtistRequest();

        try {
            // Send search request
            const searchResponse = await client.send(searchRequest);
            const artistJson = searchResponse.artists[0];
            const artist = new SpotifyArtist(artistJson);
            // Set the artist ID for the tracks request
            tracksRequest.setArtistID(artist.getId());
            // Send tracks request
            const topTracksResponse = await client.send(tracksRequest);
            setState("tracks", topTracksResponse.tracks);
        } catch (error) {
            console.error("Error searching for artist:", error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // extract artist name from form
        let form = event.currentTarget;
        let data = new FormData(form);
        const artistName = data.get("artist")?.trim();
        // Update state and perform search
        setState("artistName", artistName);
        await performSearch(artistName);
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
