class Artist {
  constructor() {
    this.artistName = {
      artist: "",
      tracks: {},
      popularity: [],
      selectedTrack: null,
    };

    // Spotify API Credentials
    this.clientID = "4c15e19067fd4e66b8b075a6e53839ab";
    this.clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";
    this.accessToken = null;

    // Initialize Spotify OAuth Token Request
    this.tokenRequest = new SpotifyOAuthTokenRequest(
      this.clientID,
      this.clientSecret
    );
    // Spotify API Request Handlers
    this.searchRequest = null;
    this.artistRequest = null;
    // DOM Elements
    this.$topTrack = document.getElementById("#topTrack");
    this.$form = document.getElementById("trackForm");
    this.$artist = document.querySelector("#artist");
    this.$track = document.querySelector("#trackList");
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.displayTracks = this.displayTracks.bind(this);
    this.$form.addEventListener("submit", this.onFormSubmit);
  }

  // Handle form submission
  async onFormSubmit(event) {
    event.preventDefault();

    try {
      this.accessToken = await this.tokenRequest.getAccessToken();
      console.log("Access Token:", this.accessToken);
      // Initialize Spotify API Request Handlers with the access token
      this.searchRequest = new SpotifySearchRequest(this.accessToken);
      this.artistRequest = new SpotifyArtistRequest(this.accessToken);
      // Perform artist search
      await this.artistSearch();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  // Search for artist and get top tracks
  async artistSearch() {
    const artistName = this.$artist.value;
    console.log("Search for " + artistName);

    try {
      const artistID = await this.searchRequest.searchArtist(artistName);
      console.log("Artist ID:", artistID);

      const tracks = await this.artistRequest.getTopTracks(artistID);
      console.log("Top Tracks:", tracks);

      this.displayTracks(tracks);
    } catch (error) {
      console.error("Error during artist search:", error);
    }
  }

  displayTracks(tracks) {
    // Assuming there is a container element with the ID 'trackList' on your HTML
    const trackListContainer = document.getElementById("trackList");

    // Clear previous content
    trackListContainer.innerHTML = "";

    // Create an ordered list to hold the tracks
    const trackList = document.createElement("ol");

    // Iterate through each track and create list items (li)
    tracks.forEach((track) => {
      const listItem = document.createElement("li");
      listItem.classList.add("track-item"); // Add a class to the list item

      // Create an image element for the album cover
      const albumCover = document.createElement("img");
      albumCover.src = track.album.images[1].url;
      albumCover.alt = "Album Cover";

      // Create a span for the track name
      const trackName = document.createElement("span");
      trackName.textContent = track.name;

      // Append the album cover and track name to the list item
      listItem.appendChild(albumCover);
      listItem.appendChild(trackName);

      // Append the list item to the ul
      trackList.appendChild(listItem);

      // Append click event listener to each list item
      listItem.addEventListener("click", () => {
        // Check if track details already exist
        const existingDetails = listItem.nextElementSibling;
        if (
          existingDetails &&
          existingDetails.classList.contains("track-details")
        ) {
          // If details exist, toggle their visibility
          existingDetails.classList.toggle("hidden");
        } else {
          // If details don't exist, render them
          const trackDetails = document.createElement("div");
          trackDetails.classList.add("track-details");
          trackDetails.innerHTML = `
                        <p>Album: ${track.album.name}</p>
                        <p>Track Number: ${track.track_number}</p>
                        <p>Release Date: ${track.album.release_date}</p>
                        <a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a>
                    `;
          listItem.insertAdjacentElement("afterend", trackDetails);
        }
      });
    });

    // Append the ul to the container
    trackListContainer.appendChild(trackList);
  }

  // Clear the current track display
  clearCurrentTrack() {
    this.$topTrack.innerHTML = "";
  }
}

// Class to handle Spotify OAuth Token Request
class SpotifyOAuthTokenRequest {
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

// Class to handle Spotify Artist Search Request
class SpotifySearchRequest {
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

// Class to handle Spotify Artist Top Tracks Request
class SpotifyArtistRequest {
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
// Initialize the Artist class when the window loads
window.onload = () => {
  new Artist();
};
