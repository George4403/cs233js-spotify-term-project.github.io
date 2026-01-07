import AlbumCover from "./AlbumCover.js";
import TrackTitle from "./TrackTitle.js";
import TrackDetailsPanel from "./TrackDetailsPanel.js";

export function TrackListItem({ track }) {
    // Create a new list item element
    const li = document.createElement("li");
    li.classList.add("track-list-item");
    // Determine the best available album cover image URL
    const imageUrl = track.getAlbum().getImageUrl(1) || null;
    // Create and append the album cover
    li.appendChild(
        AlbumCover({
            url: imageUrl,
            alt: `Album cover for ${track.album.name}`,
        })
    );

    // Create and append the track title
    li.appendChild(TrackTitle({ name: track.name }));

    // Click event to show track details
    li.addEventListener("click", () => {
        // Check if details panel already exists
        const existingDetails = li.nextElementSibling;
        if (
            existingDetails &&
            existingDetails.classList.contains("track-details")
        ) {
            // Toggle visibility if it exists
            existingDetails.classList.toggle("hidden");
            return;
        }

        // Create and insert the track details panel
        const detailsPanel = TrackDetailsPanel({
            albumName: track.album?.name,
            trackNumber: track.getTrackNumber(),
            releaseDate: track.getAlbum().getReleaseDate(),
            spotifyUrl: track.getPreviewUrl(),
        });
        li.insertAdjacentElement("afterend", detailsPanel);
    });

    return li;
}
