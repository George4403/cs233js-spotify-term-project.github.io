export default function Form({ onSubmit, onShowHistory, artistName }) {
    // Create a form element
    const form = document.createElement("form");
    form.id = "track-form";
    // Create an input element for the artist name
    const input = document.createElement("input");
    input.name = "artist";
    input.id = "artist";
    input.placeholder = "Search for an artist";
    input.value = artistName || "";
    input.required = true;
    // Create a submit button
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.id = "searchButton";
    submit.textContent = "Search";
    // Create a search history button
    const searchHistoryButton = document.createElement("button");
    searchHistoryButton.type = "button";
    searchHistoryButton.id = "searchHistoryButton";
    searchHistoryButton.textContent = "Search History";
    // Append the input, submit button, search history button, and clear search history button to the form
    form.appendChild(input);
    form.appendChild(submit);
    form.appendChild(searchHistoryButton);
    // Add event listeners
    form.addEventListener("submit", onSubmit);
    searchHistoryButton.addEventListener("click", () => {
        window.location.href = "/history";
    });

    return form;
}
