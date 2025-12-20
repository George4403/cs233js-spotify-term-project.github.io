// Class to handle Spotify Artist Search Request
export class SpotifySearchRequest {
  // Initialize with access token
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  // Search for an artist by name and return their Spotify ID
  async searchArtist(artistName) {
    // Set up the search parameters with authorization header
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
    // Make the request to search for the artist
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist`,
      searchParameters
    );
    // Parse the JSON response to extract the artist ID
    const data = await response.json();
    return data.artists.items[0].id;
  }
}
