/**@module tmdb-js/api */

/**
 * A user of the TMBD API.
 */
exports.TmdbApiUser = class {

    _apiKey;

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDB API key.
     */
    constructor(apiKey) {
        this._apiKey = apiKey;
    }
}