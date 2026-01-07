export default function TrackTitle({ name }) {
    // create a new span element to hold the track title
    const span = document.createElement("span");
    span.className = "track-title";
    // set the text content to the track's name
    span.appendChild(document.createTextNode(name));
    // return the created span element
    return span;
}
