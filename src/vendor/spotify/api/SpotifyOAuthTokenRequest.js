// Class to handle Spotify OAuth Token Request
export default class SpotifyOAuthTokenRequest {


  // The ID of the registered Spotify application that will access the API.
  // Unnecessary to store as instance variable but included for completeness.
  #clientId;

  // The secret key associated with the Spotify application.
  // Unnecessary to store as instance variable but included for completeness.
  #clientSecret;

  // The URL endpoint for obtaining the OAuth token from Spotify.
  url = "https://accounts.spotify.com/api/token";

  // The HTTP method (verb) used for the request.
  method = "POST";

  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Initialize with client ID and client secret
  constructor(clientId, clientSecret) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
  }





  // Get the request initialization object
  get init() {
    return {
      method: "POST",
      headers: this.headers,
      body: `grant_type=client_credentials&client_id=${this.#clientId}&client_secret=${this.#clientSecret}`,
    };
  }


  get type() {
    return "oauth-token"
  }
  

}
