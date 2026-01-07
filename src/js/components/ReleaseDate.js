export default function ReleaseDate({ date }) {
    // create a new p element to hold the release date
    const p = document.createElement("p");
    // set the text content to the release date
    p.appendChild(document.createTextNode(`Release Date: ${date}`));
    // return the created p element
    return p;
}
