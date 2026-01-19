export default function Form({ onSubmit, onShowHistory, onClearHistory }) {
    // Create a form element
    const form = document.createElement("form");
    form.id = "track-form";
    // Create an input element for the artist name
    const input = document.createElement("input");
    input.name = "artist";
    input.id = "artist";
    input.placeholder = "Search for an artist";
    input.required = true;
    // Create a submit button
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Search";
    // Create a search history button
    const searchHistoryButton = document.createElement("button");
    searchHistoryButton.type = "button";
    searchHistoryButton.id = "searchHistoryButton";
    searchHistoryButton.textContent = "Search History";
    // Create a clear search history button
    const clearSearchesButton = document.createElement("button");
    clearSearchesButton.type = "button";
    clearSearchesButton.id = "clearSearches";
    clearSearchesButton.textContent = "Clear Search History";
    // Append the input, submit button, search history button, and clear search history button to the form
    form.appendChild(input);
    form.appendChild(submit);
    form.appendChild(searchHistoryButton);
    form.appendChild(clearSearchesButton);
    // Add event listeners
    form.addEventListener("submit", onSubmit);
    searchHistoryButton.addEventListener("click", onShowHistory);
    clearSearchesButton.addEventListener("click", onClearHistory);

    return form;
}
