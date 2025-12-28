import SpotifyHttpClient from "../vendor/spotify/client/SpotifyHttpClient.js";
import SpotifyOAuthTokenRequest from "../vendor/spotify/api/SpotifyOAuthTokenRequest.js";
import SpotifyArtistSearchRequest from "../vendor/spotify/api/SpotifyArtistSearchRequest.js";
import SpotifyArtistRequest from "../vendor/spotify/api/SpotifyArtistRequest.js";


// Spotify API Credentials
const clientID = "4c15e19067fd4e66b8b075a6e53839ab";
const clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";

// Initialize Spotify OAuth Token Request
const tokenRequest = new SpotifyOAuthTokenRequest(
  clientID,
  clientSecret
);

const client = new SpotifyHttpClient();


export default class App {


  constructor() {


    this.artistName = {
      artist: "",
      tracks: {},
      popularity: [],
      selectedTrack: null,
    };


    client.send(tokenRequest);

    // DOM Elements
    this.$topTrack = document.getElementById("#topTrack");
    this.$form = document.getElementById("trackForm");
    this.$artist = document.querySelector("#artist");
    this.$track = document.querySelector("#trackList");
    this.displayTracks = this.displayTracks.bind(this);
    this.$form.addEventListener("submit", this.artistSearch.bind(this));
  }


  // Search for artist and get top tracks
  async artistSearch(event) {

    event.preventDefault();

    // Get user input.
    const artistName = this.$artist.value;

    // Initialize search and artist requests with the access token
    const searchRequest = new SpotifyArtistSearchRequest(artistName);
    const tracksRequest = new SpotifyArtistRequest();


    // Send search request
    const artists = await client.send(searchRequest);
    const artist = artists[0];

    tracksRequest.setArtistID(artist.getId());

    const topTracks = await client.send(tracksRequest);
    // Display the top tracks
    this.displayTracks(topTracks);


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
      albumCover.src = track.getAlbum().getImageUrl(1);
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
        if (existingDetails && existingDetails.classList.contains("track-details"))
        {
          // If details exist, toggle their visibility
          existingDetails.classList.toggle("hidden");
        }
        else
        {
          // If details don't exist, render them
          const trackDetails = document.createElement("div");
          trackDetails.classList.add("track-details");
          trackDetails.innerHTML = `
                        <p>Album: ${track.album.name}</p>
                        <p>Track Number: ${track.getTrackNumber()}</p>
                        <p>Release Date: ${track
              .getAlbum()
              .getReleaseDate()}</p>
                        <a href="${track.getPreviewUrl()}" target="_blank">Listen on Spotify</a>
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

