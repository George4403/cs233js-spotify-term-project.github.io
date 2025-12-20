/**
 * 
 * Represents an HTTP Oauth Token Request to the Spotify API.
 */
export class SpotifyOAuthTokenRequest extends Request {


  // The ID of the registered Spotify application that will access the API.
  // Unnecessary to store as instance variable but included for completeness.
  #clientId;

  // The secret key associated with the Spotify application.
  // Unnecessary to store as instance variable but included for completeness.
  #clientSecret;

  // The URL endpoint for obtaining an OAuth token from Spotify.
  static url = "https://accounts.spotify.com/api/token";

  // The HTTP method (verb) used for the request.
  static method = "POST";

  static headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };


  // Construct the Request object using credentials supplied by the application.
  constructor(clientId, clientSecret) {
    let requestInit = {
      method: SpotifyOAuthTokenRequest.method,
      headers: SpotifyOAuthTokenRequest.headers,
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    };
    super(SpotifyOAuthTokenRequest.url, requestInit);
  }

  // NOTE: This pattern won't work and won't override the URL provided in the constructor/super() call.
  // See above for a working implementation.
  get url() {
    return "https://foobar";//SpotifyOAuthTokenRequest.url;
  }




}
