import { SpotifyArtist } from "../models/SpotifyArtist.js";
import { SpotifyTrack } from "../models/SpotifyTrack.js";



/**
 * Spotify HTTP Client for sending requests to Spotify API.
 * @class
 * @param {string} accessToken - The access token for Spotify API.
 * @example <caption>Using SpotifyHttpClient to search for an artist</caption>
 * const accessToken = "MY_SECRET";
 * const client = new SpotifyHttpClient(accessToken);
 * const searchRequest = new SpotifySearchRequest(accessToken);
 * searchRequest.setArtist("Adele");
 * const artists = await client.send(searchRequest);
 * console.log(artists);
 */
export default class SpotifyHttpClient {


  // Access token for Spotify API.
  #accessToken;


  constructor(accessToken) {
    this.#accessToken = accessToken;
  }



  /*  Send a Spotify API request.
   *  @param {object} request - The Spotify API request object.
   *  @returns {Promise<object>} - A promise that resolves to the response data.
   */
  async send(request) {
    // Create the request
    const req = new Request(request.url, request.init);

    if(request.type !== "oauth-token") {
      // Add Authorization header for non-oauth-token requests
      req.headers.set("Authorization", `Bearer ${this.#accessToken}`);
    }


    console.log("Request URL:", req.url);
    // Send the request
    const response = await fetch(req);
    // Check for HTTP errors
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status} -- ${text}`);
    }

    // Parse JSON response
    const json = await response.json();


    if(request.type === "oauth-token") {

      this.#accessToken =json.access_token;
      // Save the access token for future requests.
      // It could be automaticallly attached to future requests here if desired.
      // as part of the request.headers collection.
      return json;
    }


    // Map and return the response
    return this.mapResponse(json, request);
  }

  // Map JSON response to appropriate models
  mapResponse(json, request) {
    // Search artists
    if (request.type === "artist-search") {
      return json.artists.items.map(
        (artistJson) => new SpotifyArtist(artistJson)
      );
    }

    // Get artist's top tracks
    if (request.type === "artist-top-tracks") {
      return json.tracks.map((trackJson) => new SpotifyTrack(trackJson));
    }
    // Default: return raw JSON
    return json;
  }
}
