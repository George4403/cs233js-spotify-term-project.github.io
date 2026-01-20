// function that takes the current url and returns the name of a previous search
export function getPreviousSearchNameFromUrl(url) {
    const params = new URLSearchParams(new URL(url).search);
    return params.getAll("search");
}
