export default function Errors({ message }) {
    // Clear previous tracks
    const container = document.getElementById("trackList");
    container.innerHTML =
        "<h1>Error fetching artist or tracks too many bad requests</h1>";
    return container;
}
