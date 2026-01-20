import { getPreviousSearchNameFromUrl } from "./url";
// Utility functions for managing previous searches in localStorage
// Provides functions to get, save, and clear previous searches
const STORAGE_KEY = "previousSearches";
// Retrieves the list of previous searches from localStorage
export function getPreviousSearches() {
    const searches = localStorage.getItem(STORAGE_KEY);
    return searches ? JSON.parse(searches) : [];
}

export function saveSearch(search) {
    if (!search) return;

    const searches = getPreviousSearches();
    // Check if the search already exists in the list
    if (!searches.includes(search)) {
        searches.push(search);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    }
}
// Saves a new search to the list of previous searches via URL parameters
export function savePreviousSearch(search) {
    // Get the previous searches from the URL
    const searches = getPreviousSearchNameFromUrl(window.location.href);
    searches.push(search);
    // Update the URL with the new search
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

// Clears all previous searches from localStorage
export function clearPreviousSearches() {
    localStorage.removeItem(STORAGE_KEY);
}
