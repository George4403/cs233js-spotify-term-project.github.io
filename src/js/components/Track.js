import TrackDetails from "./TrackDetails.js";

export function Track({ track }) {
    const li = document.createElement("li");
    li.classList.add("track-item"); // Add a class to the list item

    // Create a span for the track name
    const trackName = document.createElement("span");
    trackName.appendChild(document.createTextNode(track.getName()));

    // Append the track name to the list item
    li.appendChild(trackName);

    let toggleDetails = (e) => {
        // Toggle the visibility of the track details panel
        let parent = e.currentTarget;
        let details = parent.querySelector(".track-details");
        details.classList.toggle("hidden");
    };

    // Add click event listener to toggle details visibility
    li.addEventListener("click", toggleDetails);
    li.appendChild(TrackDetails({ track }));

    return li;
}
