import ChartEntry from "./ChartEntry";

export default function ChartToppers({ tracks }) {
    // create a container for the track list
    const ol = document.createElement("ol");
    ol.classList.add("grid-container");

    // iterate through each track and create ChartEntry components
    tracks.forEach((track, rank) => {
        ol.appendChild(ChartEntry({ track, rank: rank + 1 }));
    });
    // return the container with all chart entry components
    return ol;
}
