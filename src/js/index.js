import "../styles/styles.css";
// import SpotifyApp from "./SpotifyApp.js";
// import createRoot from "react-dom/client";
import { getRouteFromUrl } from "./utils/url.js";
import { createRoot } from "./utils/react.js";

let root = createRoot(document.getElementById("app"));
//root.render(<SpotifyApp />);

// Initialize the app when the window loads.
window.onload = () => {

    const appContainer = document.getElementById("app");
    root = createRoot(appContainer);

    let component = getRouteFromUrl(window.location.href);
    root.render(component);
    //app.artistSearch();
    //console.log(getRouteFromUrl(window.location.href));
};
