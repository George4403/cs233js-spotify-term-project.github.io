export default function TrackNumber({ number }) {
    // create a new p element to hold the track number
    const p = document.createElement("p");
    // set the text content to the track's number
    p.appendChild(document.createTextNode(`Track Number: ${number}`));
    // return the created p element
    return p;
}
