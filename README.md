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
      ├── artist.js       # Core logic (Spotify API integration, DOM manipulation)
 ├── /styles
      ├── style.css       # Styles
 ├── index.html      # Main page
 ├── /vendor\spotify
      ├── /api
           ├── spotifyArtistRequest.js      # Handles artists top tracks request
           ├── spotifyOAuthTokenRequest.js      # Handles OAuth token request
           ├── spotifySearchRequest.js      # Handles artist search request
      ├── /client
           ├── SpotifyHttpClient.js      # Handles spotify http client
      ├── /models
           ├── SpotifyAlbum.js      # Artists album in the spotify api
           ├── SpotifyArtist.js      # Artists in the spotify api
           ├── SpotifyTrack.js      # Artists tracks in the spotify api
```

## Clone this repository

```
git clone https://github.com/George4403/cs233js-spotify-term-project.git
```

# Run Project

```
npm run watch
```
