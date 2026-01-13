import { SpotifyTrack } from "spotify/models/SpotifyTrack";

/**
 *  @file Spotify Models Test Suite
 *  @description This test suite verifies the instantiation and basic functionality of Spotify API models.
 *  @requires jest
 *
 */
test("Test instantiating SpotifyTrack from JSON", () => {
    const payload = {
        id: "track123",
        name: "The Kids Aren't Alright",
        track_number: 1,
        duration_ms: 180000,
        popularity: 85,
        album: {
            id: "album123",
            name: "Americana",
            release_date: "1998-11-17",
            images: [{ url: "img.jpg" }],
        },
        artists: [{ name: "The Offspring" }],
        external_urls: {
            spotify: "https://open.spotify.com/track/xyz",
        },
    };

    const track = new SpotifyTrack(payload);

    // Type check
    expect(track).toBeInstanceOf(SpotifyTrack);

    // Core fields
    expect(track.getName()).toBe("The Kids Aren't Alright");
    expect(track.getId()).toBe("track123");
    expect(track.getTrackNumber()).toBe(1);
    expect(track.getPopularity()).toBe(85);

    // Album model
    expect(track.getAlbum().getName()).toBe("Americana");

    // Optional fields
    expect(track.getPreviewUrl()).toBe("https://open.spotify.com/track/xyz");
});
