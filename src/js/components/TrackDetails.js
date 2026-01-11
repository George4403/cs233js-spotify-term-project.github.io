export default function TrackDetails({ track }) {
    // If details dont exist, render them
    const details = document.createElement("div");
    details.classList.add("track-details");
    // Hide details by default
    details.classList.add("hidden");

    const album = document.createElement("p");
    album.appendChild(
        document.createTextNode(`Album: ${track.getAlbum().getName()}`)
    );

    const number = document.createElement("p");
    number.appendChild(
        document.createTextNode(`Track Number: ${track.getTrackNumber()}`)
    );

    const date = document.createElement("p");
    date.appendChild(
        document.createTextNode(
            `Release Date: ${track.getAlbum().getReleaseDate()}`
        )
    );

    const previewUrl = track.getPreviewUrl();

    if (previewUrl) {
        const link = document.createElement("a");
        link.href = previewUrl;
        link.target = "_blank";
        link.appendChild(document.createTextNode("Listen on Spotify"));
        details.appendChild(link);
    }

    details.append(album, number, date);

    return details;
}
