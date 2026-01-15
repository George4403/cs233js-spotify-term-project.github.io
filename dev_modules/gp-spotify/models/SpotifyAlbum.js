// Model class for Spotify Album
// Represents an album in the Spotify API
export class SpotifyAlbum {
    constructor(name, releaseDate) {
        this.name = name;
        this.setReleaseDate(releaseDate);
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
        this.releaseDate = this.normalizeReleaseDate(releaseDate);
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
        const parts = this.releaseDate.split("-");
        // If the release date only contains the year, return it. Otherwise, return the last part (year) of the date.
        return parts[parts.length - 1];
    }

    getReleaseMonth() {
        const parts = this.releaseDate.split("-");
        // If the release date only contains the year, return undefined. Otherwise, return the first part (month) of the date.
        return parts.length === 1 ? undefined : parts[0];
    }

    getReleaseDay() {
        const parts = this.releaseDate.split("-");
        // If the release date only contains the year or year-month, return undefined. Otherwise, return the second part (day) of the date.
        if (parts.length === 3) {
            return parts[1];
        }
        return undefined;
    }

    // Static method to create a SpotifyAlbum from JSON data
    static fromJson(json) {
        let album = new SpotifyAlbum(json.name, json.release_date);
        album.id = json.id;
        album.totalTracks = json.total_tracks;
        album.imageUrl = json.images ?? [];

        return album;
    }

    normalizeReleaseDate(date) {
        if (!date) return "";

        // Standardize all slashes to hyphens immediately
        let normalized = String(date).replaceAll("/", "-");

        // Handle Spotify ISO format: YYYY-MM-DD -> MM-DD-YYYY
        if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
            const [y, m, d] = normalized.split("-");
            return `${m}-${d}-${y}`;
        }

        // Handle Spotify ISO format: YYYY-MM -> MM-YYYY
        if (/^\d{4}-\d{2}$/.test(normalized)) {
            const [y, m] = normalized.split("-");
            return `${m}-${y}`;
        }

        // If it's already MM-DD-YYYY, MM-YYYY, or YYYY, just return it
        return normalized;
    }
}
