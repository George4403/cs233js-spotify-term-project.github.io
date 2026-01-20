/*
import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "spotify/request/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "spotify/request/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import ChartToppers from "./components/ChartToppers.js";
import Form from "./components/Form.js";
import { getPreviousSearchNameFromUrl } from "./utils/url.js";
import { saveSearch, getPreviousSearches } from "./utils/storage.js";
*/
// Export the App class as the default export
export default class App {
    constructor() {
        initializeClient();
        /*
        // DOM Elements
        this.$topTrack = document.getElementById("topTrack");
        this.$form = document.getElementById("trackForm");
        // Create and append the form component
        const form = Form({
            onSubmit: this.handleSubmit.bind(this),
            onShowHistory: this.showPreviousSearches.bind(this),
            onClearHistory: this.clearSearches.bind(this),
        });
        document.getElementById("app").appendChild(form);
        this.$artist = document.querySelector("#artist");
        this.$track = document.querySelector("#trackList");
        this.$previousSearches = document.getElementById("previousSearches");
        this.$clearSearches = document.getElementById("clearSearches");
        this.topTenChart = this.topTenChart.bind(this);
        */
    }

    render(component) {
        const appContainer = document.getElementById("app");
        appContainer.innerHTML = "";
        appContainer.appendChild(component);
    }
}
