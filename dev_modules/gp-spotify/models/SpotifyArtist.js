// Model class for Spotify Artist
// Represents an artist in the Spotify API
export class SpotifyArtist {
    constructor(json = {}) {
        this.name = json.name ?? "";
        this.id = json.id ?? "";
        this.genres = json.genres ?? [];
        this.popularity = json.popularity ?? 0;
        this.imageUrl = json.images?.[0]?.url ?? "";
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

    // Static method to create a SpotifyTrack from JSON data
    static fromJson(json) {
        return new SpotifyArtist(json);
    }
}
