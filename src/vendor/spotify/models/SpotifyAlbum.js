// Model class for Spotify Album
// Represents an album in the Spotify API
export class SpotifyAlbum {


  constructor(name, releaseDate) {
    this.name = name;
    this.releaseDate = releaseDate;
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

  setReleaseDate(releaseDate) {
    this.releaseDate = releaseDate;
  }

  getTotalTracks() {
    return this.totalTracks;
  }

  setTotalTracks(totalTracks) {
    this.totalTracks = totalTracks;
  }

  getImageUrl(size = 1) {
    return this.imageUrl[size]?.url ?? "";
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  getReleaseYear() {
    return this.releaseDate.split("-")[0];
  }

  getReleaseMonth() {
    return this.releaseDate.split("-")[1];
  }

  getReleaseDay() {
    return this.releaseDate.split("-")[2];
  }

  // Static method to create a SpotifyAlbum from JSON data
  static fromJson(json) {

    let album = new SpotifyAlbum(json.name, json.release_date);
    album.id = json.id;
    album.totalTracks = json.total_tracks;
    album.imageUrl = json.images ?? [];

    return album;
  }


}
