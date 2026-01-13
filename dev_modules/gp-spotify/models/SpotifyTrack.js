import { SpotifyAlbum } from "./SpotifyAlbum.js";
// Model class for Spotify Track
// Represents a track in the Spotify API
export class SpotifyTrack {
    constructor(json) {
        this.name = json.name;
        this.id = json.id;
        this.album = SpotifyAlbum.fromJson(json.album);
        this.artists = json.artists;
        this.durationMs = json.duration_ms;
        this.popularity = json.popularity;
        this.previewUrl = json.external_urls?.spotify ?? null;
        this.trackNumber = json.track_number;
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

    getTrackNumber() {
        return this.trackNumber;
    }

    // Static method to create a SpotifyTrack from JSON data
    static fromJson(json) {
        return new SpotifyTrack(json);
    }
}
