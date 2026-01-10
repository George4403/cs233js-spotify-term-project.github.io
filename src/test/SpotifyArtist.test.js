import { SpotifyArtist } from "../vendor/spotify/models/SpotifyArtist";

/**
 *  @file Spotify Models Test Suite
 *  @description This test suite verifies the instantiation and basic functionality of Spotify API models.
 *  @requires jest
 *
 */

test("Test instantiating SpotifyArtist", async () => {
    let payload = {
        id: "artist123",
        name: "The Offspring",
        genres: "Punk",
        popularity: 1,
        preview_url: "https://open.spotify.com/artist/xyz",
    };

    const artist = new SpotifyArtist(payload);
    // Type check
    expect(artist).toBeInstanceOf(SpotifyArtist);

    // Core fields
    expect(artist.getName()).toBe("The Offspring");
    expect(artist.getId()).toBe("artist123");
    expect(artist.getGenres()).toBe("Punk");
    expect(artist.getImageUrl()).toBe("https://open.spotify.com/artist/xyz");
});
