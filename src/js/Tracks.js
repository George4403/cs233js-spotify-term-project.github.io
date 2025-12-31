import { Track } from "./Track.js";

export function Tracks(tracks = []) {
    // Create a container for the track list
    const trackList = document.createElement("ol");
    trackList.classList.add("track-list");
    // Iterate through each track and create Track components
    tracks.forEach((track) => {
        const trackItem = Track(track);
        trackList.appendChild(trackItem);
    });
    return trackList;
}
