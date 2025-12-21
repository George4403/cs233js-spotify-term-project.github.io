// Class to handle Spotify OAuth Token Request
export class SpotifyOAuthTokenRequest extends Request {
  // The ID of the registered Spotify application that will access the API.
  // Unnecessary to store as instance variable but included for completeness.
  #clientId;

  // The secret key associated with the Spotify application.
  // Unnecessary to store as instance variable but included for completeness.
  #clientSecret;

  // The URL endpoint for obtaining the OAuth token from Spotify.
  static url = "https://accounts.spotify.com/api/token";

  // The HTTP method (verb) used for the request.
  static method = "POST";

  static headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Initialize with client ID and client secret
  constructor(clientID, clientSecret) {
    let requestInit = {
      method: SpotifyOAuthTokenRequest.method,
      headers: SpotifyOAuthTokenRequest.headers,
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    };
    super(SpotifyOAuthTokenRequest.url, requestInit);
    this.#clientId = clientID;
    this.#clientSecret = clientSecret;
  }
}
