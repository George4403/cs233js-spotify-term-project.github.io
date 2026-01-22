import History from "../components/History.js";
import Search from "../components/Search.js";
// import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";



let previousSearches = [
    "rise against",
    "green",
    "bite me",
    "beartooth",
    "alkaline",
    "metal",
    "system",
    "the offspr",
    "sum",
    "blink",
    "foo",
    "limp",
    "nirvana",
    "grand",
];
// function that takes the current url and returns the name of a previous search
export function getPreviousSearchNameFromUrl(url) {
    const params = new URLSearchParams(new URL(url).search);
    return params.getAll("search");
}

export function getRouteFromUrl(url) {
    const pathname = new URL(url).pathname;
    if (pathname === "/" || pathname.startsWith("/artist"))
    {
        return Search;
    }

    else if (pathname === "/history")
    {
        return History;
    }
    console.log(pathname);

    return pathname;
}

// Get the previous search term from the URL
//http://localhost:8080/?artist/green%20day

