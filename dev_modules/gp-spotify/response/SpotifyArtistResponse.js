import ResponseBase from "./ResponseBase.js";
import { SpotifyTrack } from "../models/SpotifyTrack.js";

export default class SpotifyArtistResponse extends ResponseBase {
    #tracks;
    #followers;
    #genres;
    #images;
    #name;
    #popularity;

    constructor(json) {
        super(json);

        this.#tracks =
            json.tracks?.map((trackJson) => new SpotifyTrack(trackJson)) ?? [];
        this.#followers = json.followers?.total ?? 0;
        this.#genres = json.genres ?? [];
        this.#images = json.images ?? [];
        this.#name = json.name ?? "";
        this.#popularity = json.popularity ?? 0;
    }

    get tracks() {
        return this.#tracks;
    }

    get followers() {
        return this.#followers;
    }

    get genres() {
        return this.#genres;
    }

    get images() {
        return this.#images;
    }

    get name() {
        return this.#name;
    }

    get popularity() {
        return this.#popularity;
    }
}
