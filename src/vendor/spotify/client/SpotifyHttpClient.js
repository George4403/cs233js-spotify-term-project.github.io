import { SpotifyArtist } from "../models/SpotifyArtist.js";
import { SpotifyTrack } from "../models/SpotifyTrack.js";

// Class to handle Spotify HTTP Client
export class SpotifyHttpClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  // Send the request and return mapped response
  async send(request) {
    // Create the request
    const req = new Request(request.url, request.init);
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
