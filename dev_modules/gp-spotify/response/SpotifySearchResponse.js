import ResponseBase from './ResponseBase.js';
import { SpotifyArtist } from "../models/SpotifyArtist.js";



export default class SpotifySearchResponse extends ResponseBase {

    #tracks;

    #artists;

    #albums;

    #shows;

    /// etc....

    constructor(json) {
        super(json);

        let tmp = JSON.parse(json);

        this.#tracks = tmp.tracks;
        this.#artists = SpotifyArtist.fromJson(json);
        this.#albums = tmp.albums;
        this.#shows = tmp.shows;
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


}
