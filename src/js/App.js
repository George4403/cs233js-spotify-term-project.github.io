import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "spotify/request/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "spotify/request/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import ChartToppers from "./components/ChartToppers.js";
import Form from "./components/Form.js";
import { getPreviousSearchNameFromUrl } from "./utils/url.js";
import { saveSearch, getPreviousSearches } from "./utils/storage.js";

let client;
// Get the previous search term from the URL
const searchTerm = getPreviousSearchNameFromUrl(window.location.href);
// If there is a previous search term, save it to localStorage
//http://localhost:8080/?artist/green%20day

// Initialize the Spotify client
window.initializeClient = initializeClient;
// Function to initialize the Spotify client
function initializeClient() {
    // Spotify API Credentials
    const clientID = "4c15e19067fd4e66b8b075a6e53839ab";
    const clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";
    // Initialize the Spotify HTTP client with the provided credentials
    client = new SpotifyHttpClient(clientID, clientSecret);
}
// Export the App class as the default export
export default class App {
    constructor() {
        initializeClient();

        // DOM Elements
        this.$topTrack = document.getElementById("topTrack");
        this.$form = document.getElementById("trackForm");
        // Create and append the form component
        const form = Form({
            onSubmit: this.handleSubmit.bind(this),
            onShowHistory: this.showPreviousSearches.bind(this),
            onClearHistory: this.clearSearches.bind(this),
        });
        // Append the form component to the app container
        document.getElementById("app").appendChild(form);
        this.$artist = document.querySelector("#artist");
        this.$track = document.querySelector("#trackList");
        this.$previousSearches = document.getElementById("previousSearches");
        this.$clearSearches = document.getElementById("clearSearches");
        this.topTenChart = this.topTenChart.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        // extract artist name from form
        let form = event.currentTarget;
        let data = new FormData(form);
        const artistName = data.get("artist");
        // search for the artist
        this.artistSearch(artistName);
    }

    // Search for artist and get top tracks
    async artistSearch(artistName) {
        // Check if artistName is valid
        if (
            artistName === undefined ||
            artistName === null ||
            artistName.trim() === ""
        ) {
            return;
        }
        // Save the search to localStorage
        saveSearch(artistName);

        // Initialize search and artist requests with the access token
        const searchRequest = new SpotifyArtistSearchRequest(artistName);
        const tracksRequest = new SpotifyArtistRequest();

        // Send search request
        const artists = await client.send(searchRequest);
        const artist = artists[0];

        tracksRequest.setArtistID(artist.getId());

        const topTracks = await client.send(tracksRequest);

        // Display the top tracks.
        this.topTenChart(topTracks);
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
    }

    topTenChart(tracks) {
        // Clear previous tracks
        const container = document.getElementById("trackList");
        container.innerHTML = "";
        // Append new tracks
        container.appendChild(ChartToppers({ tracks }));
    }

    displayError(error) {
        // Clear previous tracks
        const container = document.getElementById("trackList");
        container.innerHTML =
            "<h1>Error fetching artist or tracks too many bad requests</h1>";
    }

    showPreviousSearches() {
        // Retrieve previous searches from localStorage
        const previousSearches = getPreviousSearches();
        // Hide the track list and show the search history
        const trackList = document.getElementById("trackList");

        trackList.innerHTML = "";
        trackList.classList.add("hidden");
        // Show the search history
        trackList.innerHTML = "";
        trackList.classList.remove("hidden");
        // Display each previous search
        previousSearches.forEach((search) => {
            const div = document.createElement("div");
            div.textContent = search;
            div.classList.add("previous-search");
            // Add a click event listener to each previous search
            const searchPrevious = (event) => {
                const searchTerm = event.currentTarget.textContent;
                // Set the artist input value to the previous search
                this.artistSearch(searchTerm);
            };

            div.addEventListener("click", searchPrevious);

            trackList.appendChild(div);
        });
        console.log(previousSearches);
    }

    clearSearches() {
        // Clear previous searches from localStorage
        localStorage.removeItem("previousSearches");
        const container = document.getElementById("trackList");
        container.innerHTML = "";
    }
}
