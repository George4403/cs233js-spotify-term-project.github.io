import "../styles/styles.css";
import SpotifyApp from "./SpotifyApp.js";
import createRoot from "react-dom/client";
import App from "./App.js";

let root = createRoot(document.getElementById("app"));
//root.render(<SpotifyApp />);

// Initialize the app when the window loads.
window.onload = () => {
    let app = new App();
    app.artistSearch();
};
