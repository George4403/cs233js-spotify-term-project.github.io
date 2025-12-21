import { SpotifyAlbum } from "./SpotifyAlbum.js";

export class SpotifyTrack {
  constructor(json) {
    this.name = json.name;
    this.id = json.id;
    this.album = new SpotifyAlbum(json.album);
    this.artists = json.artists;
    this.durationMs = json.durationMs;
    this.popularity = json.popularity;
    this.previewUrl = json.previewUrl;
  }
  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getAlbum() {
    return this.album;
  }

  getArtists() {
    return this.artists;
  }

  getDurationMs() {
    return this.durationMs;
  }

  getPopularity() {
    return this.popularity;
  }

  getPreviewUrl() {
    return this.previewUrl;
  }
}
