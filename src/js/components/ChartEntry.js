export default function ChartEntry({ track, rank }) {
    // create a new li element to hold the chart entry
    const li = document.createElement("li");
    li.classList.add("track-list-item");
    li.appendChild(document.createTextNode(`# ${rank}`));

    // create a fragment to hold the album and track components
    let fragment = document.createDocumentFragment();
    fragment.appendChild(Album({}));
    fragment.appendChild(Track({ track }));
}
