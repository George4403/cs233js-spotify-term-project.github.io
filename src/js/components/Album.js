export default function Album({ track }) {
    // Create a container for the album cover
    const container = document.createElement("div");
    container.classList.add("album");
    // Create album cover image
    const albumCover = document.createElement("img");
    albumCover.src = track.getAlbum().getImageUrl(1);
    albumCover.alt = "Album Cover";

    // Put all elements into container
    container.appendChild(albumCover);

    return container;
}
