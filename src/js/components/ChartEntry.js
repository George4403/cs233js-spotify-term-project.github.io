import Album from "./Album.js";
import { Track } from "./Track.js";

export default function ChartEntry({ track, rank }) {
    // Create a new li element to hold the chart entry.
    const li = document.createElement("li");
    const rankElem = document.createElement("span");
    rankElem.classList.add("chart-rank");
    rankElem.appendChild(document.createTextNode(`#${rank}`));
    li.classList.add("track-list-item");

    li.appendChild(rankElem);

    li.appendChild(Album({ track }));
    li.appendChild(Track({ track }));

    return li;
}
