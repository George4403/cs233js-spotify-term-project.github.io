// Model class for Spotify Artist
// Represents an artist in the Spotify API
export class SpotifyArtist {
  constructor(json) {
    this.name = json.name;
    this.id = json.id;
    this.genres = json.genres;
    this.popularity = json.popularity;
    this.imageUrl = json.preview_url;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }
  getGenres() {
    return this.genres;
  }

  getPopularity() {
    return this.popularity;
  }

  getImageUrl() {
    return this.imageUrl;
  }
}
