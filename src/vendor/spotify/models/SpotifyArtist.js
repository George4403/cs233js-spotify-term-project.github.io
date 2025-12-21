export class SpotifyArtist {
  constructor(json) {
    this.name = json.name;
    this.id = json.id;
    this.genres = json.genres;
    this.popularity = json.popularity;
    this.imageUrl = json.imageUrl;
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
