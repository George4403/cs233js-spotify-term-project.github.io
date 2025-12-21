export class SpotifyAlbum {
  constructor(json) {
    this.name = json.name;
    this.id = json.id;
    this.releaseDate = json.releaseDate;
    this.totalTracks = json.totalTracks;
    this.imageUrl = json.imageUrl;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getReleaseDate() {
    return this.releaseDate;
  }

  getTotalTracks() {
    return this.totalTracks;
  }

  getImageUrl() {
    return this.imageUrl;
  }
}
