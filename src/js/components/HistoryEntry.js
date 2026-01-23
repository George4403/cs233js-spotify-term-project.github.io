import { getPreviousSearches } from "../utils/storage.js";
import History from "./History.js";

export default function HistoryEntry({ searchHistory }) {
    searchHistory = getPreviousSearches();
    // Create a search history button
    const searchHistoryButton = document.createElement("button");
    searchHistoryButton.type = "button";
    searchHistoryButton.id = "searchHistoryButton";
    searchHistoryButton.textContent = "Search History";

    searchHistoryButton.appendChild(searchHistoryButton);

    // Add a click event listener to each previous search entry
    searchHistoryButton.addEventListener("click", () => {
        window.location.href = "/history";
    });
    return searchHistoryButton;
}
