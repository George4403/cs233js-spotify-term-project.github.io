import { getPreviousSearches } from "../utils/storage.js";



export default function History({ searchHistory }) {
    // Display search history
    // Retrieve previous searches from localStorage via URL parameters
    // Retrieve search history from localStorage
    searchHistory = getPreviousSearches();

    //const searches = getPreviousSearchNameFromUrl(window.location.href);
    // Hide the track list and show the search history
    const historyContainer = document.createElement("div");
    historyContainer.id = "historyContainer";

    // Create a clear search history button
    const clearSearchesButton = document.createElement("button");
    clearSearchesButton.type = "button";
    clearSearchesButton.id = "clearSearches";
    clearSearchesButton.textContent = "Clear Search History";
    clearSearchesButton.addEventListener("click", clearSearches);
    historyContainer.appendChild(clearSearchesButton);

    function clearSearches() {
        // Clear previous searches from URL parameters
        const url = new URL(window.location.href);
        url.searchParams.delete("search");
        window.history.pushState({}, "", url);
        const container = document.getElementById("trackList");
        container.innerHTML = "";
    }

    searchHistory.forEach((search) => {
        const historyEntry = document.createElement("div");
        historyEntry.className = "historyEntry";
        historyEntry.textContent = search;
        historyContainer.appendChild(historyEntry);
    });
    //trackList.appendChild(historyContainer);
    return historyContainer;
}
