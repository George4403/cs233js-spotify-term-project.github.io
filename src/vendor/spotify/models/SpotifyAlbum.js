export class SpotifyAlbum {
  constructor(json) {
    this.name = json.name;
    this.id = json.id;
    this.releaseDate = json.release_date;
    this.totalTracks = json.total_tracks;
    this.imageUrl = json.images ?? [];
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

  getImageUrl(size = 1) {
    return this.imageUrl[size]?.url ?? "";
  }
}
