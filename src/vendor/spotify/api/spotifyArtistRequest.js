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

  get init() {
    return {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.#accessToken}`,
      },
    };
  }

  get type() {
    return "artist-top-tracks";
  }

  /*
  // High-level helper to fetch top tracks for the given artist ID
  async getTopTracks(artistID) {
    this.setArtistID(artistID);
    const req = new Request(this.url, this);
    const response = await fetch(req);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Top tracks request failed (${response.status}): ${text}`
      );
    }

    const data = await response.json();
    return data.tracks;
  }*/
}
