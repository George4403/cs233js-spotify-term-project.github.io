import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "spotify/request/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "spotify/request/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "spotify/request/SpotifyArtistRequest.js";
import { getPreviousSearchNameFromUrl } from "../utils/url.js";
import { saveSearch, getPreviousSearches } from "../utils/url.js";
import ChartToppers from "./ChartToppers";
import Form from "./Form";

export default function Search({ tracks, artistName }) {
    async function handleSubmit(event) {
        event.preventDefault();
        // extract artist name from form
        let form = event.currentTarget;
        let data = new FormData(form);
        const artistName = data.get("artist")?.trim();

        if (!artistName || artistName === "") return;
        // search for the artist
        //saveSearch(artistName);

        // Initialize search and artist requests with the access token
        const searchRequest = new SpotifyArtistSearchRequest(artistName);
        const tracksRequest = new SpotifyArtistRequest();

        // Send search request
        const artists = await client.send(searchRequest);
        const artist = artists[0];

        tracksRequest.setArtistID(artist.getId());

        const topTracks = await client.send(tracksRequest);
    }

    // render search results`
    const searchResultsContainer = document.createElement("div");
    searchResultsContainer.appendChild(
        Form({ onSubmit: handleSubmit, artistName: artistName }),
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
