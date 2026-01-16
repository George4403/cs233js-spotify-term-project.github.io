// Utility functions for managing previous searches in localStorage
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
// Saves a new search to the list of previous searches in localStorage
export function savePreviousSearch(search) {
    const searches = getPreviousSearches();
    searches.push(search);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

// Clears all previous searches from localStorage
export function clearPreviousSearches() {
    localStorage.removeItem(STORAGE_KEY);
}
