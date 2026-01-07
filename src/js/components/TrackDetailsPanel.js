import AlbumName from "./AlbumName.js";
import TrackNumber from "./TrackNumber.js";
import ReleaseDate from "./ReleaseDate.js";
import ListenOnSpotifyLink from "./ListenOnSpotifyLink.js";

export default function TrackDetailsPanel({
    albumName = "Unknown Album",
    trackNumber = "N/A",
    releaseDate = "N/A",
    spotifyUrl = "#",
}) {
    // create a new div element to hold the track details panel
    const div = document.createElement("div");
    // add a class to the div for styling
    div.classList.add("track-details");

    // append the various details to the div
    div.appendChild(AlbumName({ name: albumName }));
    div.appendChild(TrackNumber({ number: trackNumber }));
    div.appendChild(ReleaseDate({ date: releaseDate }));
    div.appendChild(ListenOnSpotifyLink({ url: spotifyUrl }));

    // return the created div element
    return div;
}
