// Class to handle Spotify Artist Top Tracks Request
export class SpotifyArtistRequest {
  // Base URL for Spotify Artist API
  static baseURL = "https://api.spotify.com/v1/artists";
  // Private fields
  #artistID;
  #accessToken;
  // Initialize with access token
  constructor(accessToken) {
    this.#accessToken = accessToken;
  }

  // Set the artist ID for the request
  setArtistID(id) {
    this.#artistID = id;
  }

  // Get the full URL for top tracks
  get url() {
    return `${SpotifyArtistRequest.baseURL}/${
      this.#artistID
    }/top-tracks?market=US`;
  }

  // Get the request initialization object
  get init() {
    return {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.#accessToken}`,
      },
    };
  }

  // Get the request type
  get type() {
    return "artist-top-tracks";
  }
}
