import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "spotify/request/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "spotify/request/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import ChartToppers from "./components/ChartToppers.js";

let client;


window.initializeClient = initializeClient;


function initializeClient() {
    // Spotify API Credentials
    const clientID = "4c15e19067fd4e66b8b075a6e53839ab";
    const clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";


    client = new SpotifyHttpClient(clientID, clientSecret);
}



export default class App {
    constructor() {

        initializeClient();

        // DOM Elements
        this.$topTrack = document.getElementById("#topTrack");
        this.$form = document.getElementById("trackForm");
        this.$artist = document.querySelector("#artist");
        this.$track = document.querySelector("#trackList");
        this.topTenChart = this.topTenChart.bind(this);
        this.$form.addEventListener("submit", this.artistSearch.bind(this));
    }

    // Search for artist and get top tracks
    async artistSearch(event) {
        event.preventDefault();

        // Get user input.
        const artistName = this.$artist.value;

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
}
