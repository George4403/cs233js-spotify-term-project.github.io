// Class to handle Spotify OAuth Token Request
export class SpotifyOAuthTokenRequest {
  // Initialize with client ID and client secret
  constructor(clientID, clientSecret) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
  }

  // Fetch the access token from Spotify API
  async getAccessToken() {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${this.clientID}&client_secret=${this.clientSecret}`,
    };
    // Make the request to get the access token
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authParameters
    );
    // Parse the JSON response to extract the access token
    const data = await response.json();
    return data.access_token;
  }
}
