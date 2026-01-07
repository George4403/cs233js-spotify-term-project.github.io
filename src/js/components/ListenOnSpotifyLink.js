export default function ListenOnSpotifyLink({ url }) {
    // create a new a element to hold the Spotify link
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.appendChild(document.createTextNode("Listen on Spotify"));
    // return the created a element
    return a;
}
