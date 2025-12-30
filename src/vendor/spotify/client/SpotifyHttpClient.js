import { SpotifyArtist } from "../models/SpotifyArtist.js";
import { SpotifyTrack } from "../models/SpotifyTrack.js";

/**
 * Spotify HTTP Client for sending requests to Spotify API.
 * @class
 * @param {string} accessToken - The access token for Spotify API.
 * @example <caption>Using SpotifyHttpClient to search for an artist</caption>
 * const accessToken = "MY_SECRET";
 * const client = new SpotifyHttpClient(accessToken);
 * const searchRequest = new SpotifyArtistSearchRequest("Adele");
 * const artists = await client.send(searchRequest);
 * console.log(artists);
 */
export default class SpotifyHttpClient {
    // Access token for Spotify API.
    #accessToken;
    // Expiration time of the access token.
    #tokenExpiresAt = null;
    // Current token request in progress.
    #tokenRequest = null;
    // Promise for refreshing token.
    #refreshingToken = null;
    constructor(accessToken) {
        this.#accessToken = accessToken;
    }

    // Ensure the access token is valid, refresh if expired.
    async #ensureValidToken() {
        const now = Date.now();
        const buffer = 60000; // 1 minute buffer

        if (!this.#tokenExpiresAt) return;
        // Token is still valid
        if (now < this.#tokenExpiresAt - buffer) return;
        // Token expired, refresh it
        if (this.#refreshingToken) {
            await this.#refreshingToken;
            return;
        }
        // Start token refresh
        if (!this.#tokenRequest) {
            throw new Error(
                "Access token expired and no token request provided."
            );
        }
        // Begin refreshing token
        this.#refreshingToken = (async () => {
            try {
                // Send token request
                await this.send(this.#tokenRequest);
            } finally {
                // Clear the refreshing token promise
                this.#refreshingToken = null;
            }
        })();
        // Wait for the token to be refreshed
        await this.#refreshingToken;
    }

    /*  Send a Spotify API request.
     *  @param {object} request - The Spotify API request object.
     *  @returns {Promise<object>} - A promise that resolves to the response data.
     */
    async send(request) {
        // Ensure valid token for non-oauth-token requests
        if (request.type !== "oauth-token") {
            await this.#ensureValidToken(this.#tokenRequest);
        } else {
            // Save the token request for future refreshes
            this.#tokenRequest = request;
        }
        // Create the request
        let init = request.init;
        init.method = request.method;

        const req = new Request(request.url, request.init);

        if (request.type !== "oauth-token") {
            // Add Authorization header for non-oauth-token requests
            req.headers.set("Authorization", `Bearer ${this.#accessToken}`);
        }

        console.log("Request URL:", req.url);
        console.log("Used Token: ", this.#accessToken);
        // Send the request
        const response = await fetch(req);
        // Check for HTTP errors
        if (!response.ok) {
            const text = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status} -- ${text}`
            );
        }

        // Parse JSON response
        const json = await response.json();

        if (request.type === "oauth-token") {
            this.#accessToken = json.access_token;
            // Set token expiration time
            if (json.expires_in) {
                this.#tokenExpiresAt = Date.now() + json.expires_in * 1000;
            }
            // Save the access token for future requests.
            // It could be automaticallly attached to future requests here if desired.
            // as part of the request.headers collection.
            console.log("Obtained Access Token:", this.#accessToken);
            return json;
        }

        // Map and return the response
        return this.mapResponse(json, request.type);
    }

    // Map JSON response to appropriate models
    mapResponse(json, type) {
        // Search artists
        if (type === "artist-search") {
            return json.artists.items.map(
                (artistJson) => new SpotifyArtist(artistJson)
            );
        }

        // Get artist's top tracks
        if (type === "artist-top-tracks") {
            return json.tracks.map((trackJson) => new SpotifyTrack(trackJson));
        }
        // Default: return raw JSON
        return json;
    }
}
