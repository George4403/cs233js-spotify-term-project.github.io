export default function ReleaseDate({ date }) {
    // create a new p element to hold the release date
    const p = document.createElement("p");
    // set the text content to the release date
    // TODO: Format date to be more user friendly (e.g., "January 1, 2020")
    p.appendChild(document.createTextNode(`Release Date: ${date}`));
    // return the created p element
    return p;
}
