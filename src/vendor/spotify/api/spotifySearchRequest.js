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
  /*
  // High-level helper to perform the search and return the first artist ID
  async searchArtist(artistName) {
    this.setArtist(artistName);

    const req = new Request(this.url, this);
    const response = await fetch(req);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Artist search failed (${response.status}): ${text}`);
    }

    const data = await response.json();
    if (
      !data.artists ||
      !data.artists.items ||
      data.artists.items.length === 0
    ) {
      throw new Error("No artist found");
    }

    return data.artists.items[0].id;
  }
  */
}
