import ResponseBase from './ResponseBase';
import { SpotifyArtist } from "../models/SpotifyArtist.js";



export default class ArtistResponse extends ResponseBase {

    #artist;

    constructor(json) {
        super();
        this.#artist = SpotifyArtist.fromJson(json);
    }

    get artist() {
        return this.#artist;
    }

}
