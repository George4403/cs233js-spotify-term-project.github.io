<h1>Spotify Artist Top 10</h1>
<img width="2519" height="992" alt="image" src="https://github.com/user-attachments/assets/f4d5c6df-6378-4d19-bdf8-80acd4874fa4" />

A web application that lets users search for an artist and view their Top 10 tracks using the Spotify Web API.

<h2>Features</h2>

Search for any artist by name

Fetch and display their Top 10 songs

Shows album cover, album name, release date, and a link to listen on Spotify

Click on a track to reveal more details

Built with Vanilla JavaScript, HTML, and Bootstrap CSS

## Repository Structure

```
/src
 ├── /js
      ├── App.js    # Entry point.
 ├── /styles
      ├── style.css
 ├── index.html
 ├── /vendor/spotify
      ├── /api
           ├── SpotifyArtistRequest.js      # Handles artists top tracks request.
           ├── SpotifyOAuthTokenRequest.js  # Handles OAuth token request.
           ├── SpotifySearchRequest.js      # Handles artist search request.
      ├── /client
           ├── SpotifyHttpClient.js      # Handles Spotify API requests.
      ├── /models
           ├── SpotifyAlbum.js      # Artists album in the spotify api.
           ├── SpotifyArtist.js     # Artists in the spotify api.
           ├── SpotifyTrack.js      # Artists tracks in the spotify api.
```

## Installation

-   <code>git pull</code> or <code>git clone ...</code>
-   <code>git submodule update --init --recursive</code>
-   <code>npm update</code>
-   <code>npm run build</code> or <code>npm run watch</code>
