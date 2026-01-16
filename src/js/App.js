import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "spotify/request/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "spotify/request/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import ChartToppers from "./components/ChartToppers.js";
import { getPreviousSearchNameFromUrl } from "./utils/url.js";
import { saveSearch, getPreviousSearches } from "./utils/storage.js";

let client;
// Get the previous search term from the URL
const searchTerm = getPreviousSearchNameFromUrl(window.location.href);
// If there is a previous search term, save it to localStorage
if (searchTerm) {
    saveSearch(searchTerm);
}
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
        this.$topTrack = document.getElementById("#topTrack");
        this.$form = document.getElementById("trackForm");
        this.$artist = document.querySelector("#artist");
        this.$track = document.querySelector("#trackList");
        this.$previousSearches = document.getElementById("previousSearches");
        this.$clearSearches = document.getElementById("clearSearches");
        this.topTenChart = this.topTenChart.bind(this);
        this.$form.addEventListener("submit", this.artistSearch.bind(this));
        this.$previousSearches.addEventListener(
            "click",
            this.showPreviousSearches.bind(this)
        );
        this.$clearSearches.addEventListener(
            "click",
            this.clearSearches.bind(this)
        );
    }

    // Search for artist and get top tracks
    async artistSearch(event) {
        // Hide the search history and show the track list
        document.getElementById("searchHistory").classList.add("hidden");
        this.$track.classList.remove("hidden");
        this.$track.innerHTML = "";
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get user input.
        const artistName = this.$artist.value;

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
        const historyContainer = document.getElementById("searchHistory");

        trackList.innerHTML = "";
        trackList.classList.add("hidden");
        // Show the search history
        historyContainer.innerHTML = "";
        historyContainer.classList.remove("hidden");
        // Display each previous search
        previousSearches.forEach((search) => {
            const div = document.createElement("div");
            div.textContent = search;
            div.classList.add("previous-search");
            // Add a click event listener to each previous search
            div.addEventListener("click", () => {
                historyContainer.classList.add("hidden");
                trackList.classList.remove("hidden");
                // Set the artist input value to the previous search
                this.$artist.value = search;
                this.artistSearch(new Event("submit"));
            });

            historyContainer.appendChild(div);
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
