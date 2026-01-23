import ResponseBase from "./ResponseBase.js";
import { SpotifyArtist } from "../models/SpotifyArtist.js";

export default class SpotifySearchResponse extends ResponseBase {
    #tracks;
    #artists;
    #albums;
    #playlists;
    #shows;
    #episodes;
    #audiobooks;

    /// etc....

    constructor(json) {
        super(json);

        this.#tracks = json.tracks?.items ?? [];
        this.#artists = json.artists?.items ?? [];
        this.#albums = json.albums?.items ?? [];
        this.#playlists = json.playlists?.items ?? [];
        this.#shows = json.shows?.items ?? [];
        this.#episodes = json.episodes?.items ?? [];
        this.#audiobooks = json.audiobooks?.items ?? [];
        /// etc....
    }

    get artists() {
        return this.#artists;
    }

    get tracks() {
        return this.#tracks;
    }

    get albums() {
        return this.#albums;
    }

    get shows() {
        return this.#shows;
    }

    get playlists() {
        return this.#playlists;
    }

    get episodes() {
        return this.#episodes;
    }

    get audiobooks() {
        return this.#audiobooks;
    }
}
