// Class to handle Spotify Artist Top Tracks Request
export class SpotifyArtistRequest extends Request {
  // Base URL for Spotify Artist API
  static baseURL = "https://api.spotify.com/v1/artists";
  // Private fields
  #artistID;
  #accessToken;
  // Initialize with access token
  constructor(accessToken, artistID = "") {
    super(SpotifyArtistRequest.baseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Set access token and artist ID
    this.#accessToken = accessToken;
    this.#artistID = artistID;
  }

  // Set the artist ID for the request
  setArtistID(artistID) {
    this.#artistID = artistID;
  }

  // Build the full URL for top tracks
  buildTopTracksUrl() {
    return `${SpotifyArtistRequest.baseURL}/${
      this.#artistID
    }/top-tracks?market=US`;
  }

  // Fetch top tracks for the artist
  async fetchTopTracks() {
    const response = await fetch(new Request(this.buildTopTracksUrl(), this));
    const data = await response.json();
    return data.tracks;
  }
}
