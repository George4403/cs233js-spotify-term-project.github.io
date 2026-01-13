export default function TrackDetails({ track }) {
    // If details dont exist, render them
    const details = document.createElement("div");
    details.classList.add("track-details");
    // Hide details by default
    details.classList.add("hidden");
    // Create and append album name
    const album = document.createElement("p");
    album.appendChild(
        document.createTextNode(`Album: ${track.getAlbum().getName()}`)
    );
    // Create and append track number
    const number = document.createElement("p");
    number.appendChild(
        document.createTextNode(`Track Number: ${track.getTrackNumber()}`)
    );
    // Create and append album release date
    const date = document.createElement("p");
    date.appendChild(
        document.createTextNode(
            `Release Date: ${track.getAlbum().getReleaseDate()}`
        )
    );
    // Create and append link to spotify
    const previewUrl = track.getPreviewUrl();

    if (previewUrl) {
        const link = document.createElement("a");
        link.href = previewUrl;
        link.target = "_blank";
        link.appendChild(document.createTextNode("Listen on Spotify"));
        details.appendChild(link);
    }
    // append all details
    details.append(album, number, date);

    return details;
}
