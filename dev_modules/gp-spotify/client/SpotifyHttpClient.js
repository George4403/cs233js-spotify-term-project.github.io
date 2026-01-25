import { SpotifyArtist } from "../models/SpotifyArtist.js";
import { SpotifyTrack } from "../models/SpotifyTrack.js";
import SpotifyOAuthTokenRequest from "../request/SpotifyOAuthTokenRequest.js";

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

    #authorizationRequest;
    #counter = 0;

    static MAX_REQUESTS = 5;
    constructor(clientId, clientSecret) {
        this.#authorizationRequest = new SpotifyOAuthTokenRequest(
            clientId,
            clientSecret,
        );
    }

    /*  Send a Spotify API request.
     *  @param {object} request - The Spotify API request object.
     *  @returns {Promise<object>} - A promise that resolves to the response data.
     */
    async send(request) {
        // Create the request
        let init = request.init;
        init.method = request.method;

        // Define counter for retry attempts
        const req = new Request(request.url, request.init);

        // Add Authorization header for non-oauth-token requests
        if (request.type !== "oauth-token") {
            req.headers.set("Authorization", `Bearer ${this.#accessToken}`);
        }

        // Send the request
        const response = await fetch(req);

        // Parse JSON response
        const json = await response.json();

        // If counter exceeds 5 attempts, throw error
        if (this.#counter >= SpotifyHttpClient.MAX_REQUESTS) {
            throw new Error("Max retry attempts exceeded.");
        }

        // Increment counter for rate limiting and authorization errors
        if ([401, 403, 429].includes(response.status)) {
            this.#counter += 1;
        }

        // If unauthorized, attempt to get a new token and retry the request.
        if (response.status === 401) {
            return this.send(this.#authorizationRequest).then(() =>
                this.send(request),
            );
        }

        if (request.type === "oauth-token") {
            this.#accessToken = json.access_token;
            // Save the access token for future requests.
            // It could be automaticallly attached to future requests here if desired.
            // as part of the request.headers collection.
            return json;
        }

        // Check for HTTP errors
        if (!response.ok) {
            const text = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status} -- ${text}`,
            );
        }

        // Map and return the response
        return this.mapResponse(json, request);
    }

    // Map JSON response to appropriate models
    async mapResponse(json, request) {
        /*'

        What kind of request did we have?
        Based on the request type, which response class should we import?
        // Learn how to use dynamic imports
        // For example, import("path to response class")
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
        */
        // Get the response type from the request
        const responseTypes = request.responseType;
        // If no response type is defined, return raw JSON
        if (!responseTypes) {
            return json;
        }
        // Dynamically import the appropriate response class
        const responseModule = await import(`../response/${responseTypes}.js`);
        // Get the response class from the module
        const ResponseClass = responseModule.default;
        // return new instance of the response class
        return new ResponseClass(json);
    }
}
