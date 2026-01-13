# Spotify Artist Top 10

Retrieve an artist's most listened-to music on the Spotify platform.
![Example using Spotify Artist's Top 10 app](screenshots/Spotify%20Top%2010%20Example.png)

## Features

-   Search for an artist's Top 10 Spotify tracks by artist name.
-   Display the track, album name, cover art and release date.
-   Listen to tracks on the Spotify app (external link).

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
