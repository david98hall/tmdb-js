/**@module tmdb-js/api */

/**
 * A user of the TMBD API.
 */
exports.TmdbApiUser = class {

    _apiKey;

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     */
    constructor(apiKey) {
        this._apiKey = apiKey;
    }
}