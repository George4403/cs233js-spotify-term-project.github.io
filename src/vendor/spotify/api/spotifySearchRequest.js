// Class to handle Spotify Artist Search Request
export class SpotifySearchRequest extends Request {
  // Base URL for Spotify Search API
  static baseURL = "https://api.spotify.com/v1/search";
  // Private fields
  #artistName;
  #accessToken;
  // Initialize with access token
  constructor(accessToken) {
    // Call parent constructor
    super(SpotifySearchRequest.baseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Set access token
    this.#accessToken = accessToken;
  }

  // Set the artist name for the search
  setArtist(artistName) {
    this.#artistName = artistName;
  }

  // Build the full URL with query parameters
  buildUrl() {
    // Create URLSearchParams for query parameters
    const params = new URLSearchParams({
      q: this.#artistName,
      type: "artist",
    });
    // Return the full URL
    return `${SpotifySearchRequest.baseURL}?${params.toString()}`;
  }

  // Fetch artist ID based on artist name
  async fetchArtistId() {
    // Make the API request
    const response = await fetch(new Request(this.buildUrl(), this));
    // Parse the JSON response
    const data = await response.json();
    return data.artists.items[0].id;
  }
}
