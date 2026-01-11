export default function Album({ url, alt, name, date, url1 }) {
    // Create a container for all elements
    const container = document.createElement("div");
    container.classList.add("album");
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
    // spotify link
    const a = document.createElement("a");
    a.href = url1;
    a.target = "_blank";
    a.appendChild(document.createTextNode("Listen on Spotify"));
    // Put all elements into container
    container.appendChild(img);
    container.appendChild(p);
    container.appendChild(p1);
    container.appendChild(a);

    return container;
}
