export default function AlbumName({ name }) {
    // create a new p element to hold the album name
    const p = document.createElement("p");
    // set the text content to the album's name
    p.appendChild(document.createTextNode(`Album: ${name}`));
    // return the created p element
    return p;
}
