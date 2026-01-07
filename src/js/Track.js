export function Track(track) {
    const li = document.createElement("li");
    li.classList.add("track-item"); // Add a class to the list item

    // Create an image element for the album cover
    const albumCover = document.createElement("img");
    albumCover.src = track.getAlbum().getImageUrl(1);
    albumCover.alt = "Album Cover";

    // Create a span for the track name
    const trackName = document.createElement("span");
    trackName.textContent = track.name;

    // Append the album cover and track name to the list item
    li.appendChild(albumCover);
    li.appendChild(trackName);

    // Append click event listener to each list item
    li.addEventListener("click", () => {
        // Check if track details already exist
        const existingDetails = li.nextElementSibling;
        if (
            existingDetails &&
            existingDetails.classList.contains("track-details")
        ) {
            // If details exist, toggle their visibility
            existingDetails.classList.toggle("hidden");
            return;
        }

        // If details don't exist, render them
        const details = document.createElement("div");
        details.classList.add("track-details");
        details.innerHTML = `
            <p>Album: ${track.album.name}</p>
            <p>Track Number: ${track.getTrackNumber()}</p>
            <p>Release Date: ${track.getAlbum().getReleaseDate()}</p>
            <a href="${track.getPreviewUrl()}" target="_blank">Listen on Spotify</a>
        `;
        // Insert the details after the list item
        li.insertAdjacentElement("afterend", details);
    });

    return li;
}
