export default function Album({ url, alt, name, date }) {
    // cover
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt;

    // album name
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(`Album: ${name}`));
    // release date
    const p1 = document.createElement("p");
    p1.appendChild(document.createTextNode(`Release Date: ${date}`));
    return img, p, p1;
}
