import { SpotifyArtist } from "../models/SpotifyArtist.js";
import { SpotifyTrack } from "../models/SpotifyTrack.js";

// Class to handle Spotify HTTP Client
export class SpotifyHttpClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  // Send the request and return mapped response
  async send(request) {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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

    return json;
  }
}
