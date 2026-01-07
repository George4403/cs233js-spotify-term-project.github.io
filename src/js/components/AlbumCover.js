export default function AlbumCover({ url, alt }) {
    // create a new img element to hold the album cover
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt;
    // return the created img element
    return img;
}
