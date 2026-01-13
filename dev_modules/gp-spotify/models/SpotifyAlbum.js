// Model class for Spotify Album
// Represents an album in the Spotify API
export class SpotifyAlbum {
    constructor(name, releaseDate) {
        this.name = name;
        this.releaseDate = this.normalizeReleaseDate(releaseDate);
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
        return this.releaseDate?.split("-")[0];
    }

    getReleaseMonth() {
        return this.releaseDate?.split("-")[1];
    }

    getReleaseDay() {
        return this.releaseDate?.split("-")[2];
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
        // Ensure we operate on a string
        date = String(date);
        // Handle YYYY-MM-DD or YYYY-MM (Converting to MM-DD-YYYY)
        if (date.includes("-")) {
            const parts = date.split("-");
            // YYYY-MM-DD -> MM-DD-YYYY
            if (parts.length === 3) {
                const [year, month, day] = parts;
                return `${month}-${day}-${year}`;
            }
            // YYYY-MM -> MM-YYYY
            if (parts.length === 2) {
                const [year, month] = parts;
                return `${month}-${year}`;
            }
        }
        // Handle MM/DD/YYYY (Standardizing separators to hyphens)
        if (date.includes("/")) {
            return date.replace(/\//g, "-");
        }
        // Fallback for YYYY only or already formatted strings
        return date;
    }
}
