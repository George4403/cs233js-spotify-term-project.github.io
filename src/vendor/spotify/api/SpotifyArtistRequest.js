// Class to handle Spotify Artist Top Tracks Request
export default class SpotifyArtistRequest {
  // Base URL for Spotify Artist API
  static baseURL = "https://api.spotify.com/v1/artists";
  // Private fields
  #artistID;


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
      method: "GET"
    };
  }

  // Get the request type
  get type() {
    return "artist-top-tracks";
  }
}
