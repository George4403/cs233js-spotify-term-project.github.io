// Class to handle Spotify Artist Search Request
export default class SpotifyArtistSearchRequest {
  // Base URL for Spotify Search API
  #baseURL = "https://api.spotify.com/v1/search";
  // Private fields
  #artistName;

  constructor(name) {
    this.#artistName = name;
  }


  // Get the full URL for the search
  get url() {
    const params = new URLSearchParams({
      q: this.#artistName,
      type: "artist",
    });
    return `${this.#baseURL}?${params.toString()}`;
  }

  // Get the request initialization object
  get init() {
    return {
      method: "GET"
    };
  }

  // Get the request type
  get type() {
    return "artist-search";
  }
}
