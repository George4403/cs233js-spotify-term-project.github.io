import { TrackListItem } from "./components/TrackListItem.js";

export function Tracks({ tracks }) {
    // Create a container for the track list
    const ol = document.createElement("ol");

    // Iterate through each track and create Track components
    tracks.forEach((track) => {
        ol.appendChild(TrackListItem({ track }));
    });
    // Return the container with all track components
    return ol;
}
