import { SpotifyAlbum } from "spotify/models/SpotifyAlbum.js";

/**
 * @file Spotify Models Test Suite
 * @description This test suite verifies the instantiation and basic functionality of Spotify API models.
 * @requires jest
 *
 */
test("Test instantiating SpotifyAlbum", async () => {
    let album = new SpotifyAlbum("Conspiracy Of One", "11/14/2000");
    let album2 = new SpotifyAlbum("Conspiracy Of One", "11/2000");
    let album3 = new SpotifyAlbum("Conspiracy Of One", "2000");

    let payload = {
        name: "Conspiracy Of One",
        release_date: "2000-11-14",
        id: "abcd1234",
        total_tracks: 13,
        images: [
            {
                url: "https://cdn.album-covers.com/abcd1234",
                height: 640,
                width: 640,
            },
            {
                url: "https://cdn.album-covers.com/abcd1234_300",
                height: 300,
                width: 300,
            },
            {
                url: "https://cdn.album-covers.com/abcd1234_64",
                height: 64,
                width: 64,
            },
        ],
    };
    let album4 = SpotifyAlbum.fromJson(payload);
    expect(album4.getName()).toBe(album.getName()); // Confirm that the object constructed from the API, is same as that constructed from everyday language.
    expect(album4.getReleaseYear()).toBe(album.getReleaseYear());
    expect(album4.getReleaseMonth()).not.toBe(album3.getReleaseMonth());

    album.setTotalTracks(13);
    album.setImageUrl("https://cdn.album-covers.com/abcd1234");

    // Test that album is a type of SpotifyAlbum
    expect(album instanceof SpotifyAlbum).toBe(true);
    expect(album.getName()).toBe("Conspiracy Of One");
    expect(album.getReleaseDate()).toBe("11/14/2000");
    expect(album.getTotalTracks()).toBe(13);
    expect(album.getImageUrl()).toBe("https://cdn.album-covers.com/abcd1234");

    // Ensure that the object does *not have an id.
    expect(album.getId()).toBeUndefined();

    let rm = album.getReleaseMonth();
    let rd = album.getReleaseDay();
    let ry = album.getReleaseYear();

    // We only know the year; i.e., like a normal person.
    let rm2 = album3.getReleaseMonth();
    expect(rm2).toBe("11");
    let rd2 = album3.getReleaseDay();
    expect(rd2).toBeUndefined();
    let ry2 = album3.getReleaseYear();
    expect(ry2).toBe("2000");

    // Example of an assertion that passes.
    expect(1).toBe(1);
});
