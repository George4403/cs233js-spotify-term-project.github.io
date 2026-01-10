export default function TrackDetails(track) {
    // If details dont exist, render them
    const details = document.createElement("div");
    details.className.add("track-details");
    // Hide details by default
    details.classList.add("hidden");
    details.innerHTML = `
    <p>Album: ${track.getAlbum().name}</p>
    <p>Track Number: ${track.getTrackNumber()}</p>
    <p>Release Date: ${track.getAlbum().getReleaseDate()}</p>
    <p><a href="${track.getPreviewUrl()}" target="_blank">Listen on Spotify</a></p>
    `;

    return details;
}
