// Class to handle Spotify Artist Search Request
export class SpotifySearchRequest {
  // Base URL for Spotify Search API
  static baseURL = "https://api.spotify.com/v1/search";
  // Private fields
  #artistName;
  #accessToken;
  // Initialize with access token
  constructor(accessToken) {
    // Set access token
    this.#accessToken = accessToken;
  }

  // Set the artist name for the search
  setArtist(name) {
    this.#artistName = name;
  }

  // Get the full URL for the search
  get url() {
    const params = new URLSearchParams({
      q: this.#artistName,
      type: "artist",
    });
    return `${SpotifySearchRequest.baseURL}?${params.toString()}`;
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
    return "artist-search";
  }
}
