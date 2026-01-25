import { getPreviousSearches } from "../utils/storage.js";

export default function History({ searchHistory }) {
    // Display search history
    // Retrieve previous searches from localStorage via URL parameters
    // Retrieve search history from localStorage
    searchHistory = getPreviousSearches();

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

    // Create a back button to return to the search page
    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.id = "backButton";
    backButton.textContent = "Back to Search";
    backButton.addEventListener("click", () => {
        window.location.href = "/";
    });
    historyContainer.appendChild(backButton);
    // Function to clear search history
    function clearSearches() {
        localStorage.removeItem("previousSearches");
        // Refresh the history page to reflect the cleared history
        window.location.reload();
    }

    // Populate the history container with search entries
    searchHistory.forEach((artistName) => {
        const historyEntry = document.createElement("a");
        historyEntry.className = "historyEntry";
        historyEntry.textContent = artistName;
        historyContainer.appendChild(historyEntry);
        historyEntry.href = `/artist/${encodeURIComponent(artistName)}`;
    });

    return historyContainer;
}
