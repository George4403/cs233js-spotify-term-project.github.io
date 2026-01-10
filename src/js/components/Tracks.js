import { TrackListItem } from "./TrackListItem.js";

export function Tracks({ tracks }) {
    // Create a container for the track list
    const ol = document.createElement("ol");
    ol.className = "grid-container";

    // Iterate through each track and create Track components
    tracks.forEach((track) => {
        let li = TrackListItem({ track });
        ol.appendChild(li);
    });

    // Return the container with all track components
    return ol;
}
