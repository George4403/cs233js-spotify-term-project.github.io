import History from "../components/History.js";
import Search from "../components/Search.js";
import SpotifyHttpClient from "spotify/client/SpotifyHttpClient.js";

let client;

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
    if (pathname === "/") {
        return Search({ tracks: [], artistName: "green day" });
    }
    if (pathname.startsWith("/artist")) {
        return Search({ tracks: [], artistName: "" });
    }
    if (pathname === "/history") {
        return History({ searchHistory: previousSearches });
    }
    console.log(pathname);
    return pathname;
}

// Get the previous search term from the URL
//http://localhost:8080/?artist/green%20day

// Initialize the Spotify client
window.initializeClient = initializeClient;
// Function to initialize the Spotify client
function initializeClient() {
    // Spotify API Credentials
    const clientID = "4c15e19067fd4e66b8b075a6e53839ab";
    const clientSecret = "1a0b2b1255c94798ab70d92facf6c42f";
    // Initialize the Spotify HTTP client with the provided credentials
    client = new SpotifyHttpClient(clientID, clientSecret);
}
