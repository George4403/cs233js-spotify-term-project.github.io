// Class to handle Spotify Artist Top Tracks Request
export class SpotifyArtistRequest {
  // Initialize with access token
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  // Get the top tracks for a given artist ID
  async getTopTracks(artistID) {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
    // Make the request to get the artist's top tracks
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=us`,
      searchParameters
    );
    // Parse the JSON response to extract the tracks
    const data = await response.json();
    return data.tracks;
  }
}
