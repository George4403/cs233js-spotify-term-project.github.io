import SpotifyHttpClient from "../vendor/spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "../vendor/spotify/api/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "../vendor/spotify/api/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "../vendor/spotify/api/SpotifyArtistRequest.js";
import { Tracks } from "./Tracks.js";

// Spotify API Credentials
const clientID = "4c15e19067fd4e66b8b075a6e53839ab";
const clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";

// Initialize Spotify OAuth Token Request
const tokenRequest = new SpotifyOAuthTokenRequest(clientID, clientSecret);

const client = new SpotifyHttpClient();

export default class App {
    constructor() {
        // Get access token and set it in the client
        client.send(tokenRequest);

        // DOM Elements
        this.$topTrack = document.getElementById("#topTrack");
        this.$form = document.getElementById("trackForm");
        this.$artist = document.querySelector("#artist");
        this.$track = document.querySelector("#trackList");
        this.displayTracks = this.displayTracks.bind(this);
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
        let topTracks = [];

        try {
            // Send search request
            const artists = await client.send(searchRequest);
            const artist = artists[0];

            tracksRequest.setArtistID(artist.getId());

            topTracks = await client.send(tracksRequest);
            // Display the top tracks.
            this.displayTracks(topTracks);
        } catch (error) {
            this.displayError(error);
            return;
        }
    }

    displayTracks(tracks) {
        // Clear previous tracks
        const container = document.getElementById("trackList");
        container.innerHTML = "";
        // Append new tracks
        container.appendChild(Tracks({ tracks }));
    }

    displayError(error) {
        // Clear previous tracks
        const container = document.getElementById("trackList");
        container.innerHTML =
            "<h1>Error fetching artist or tracks too many bad requests</h1>";
    }
}
