/**@module tmdb-js/api */

/**
 * A user of the TMDb API.
 */
exports.TmdbApiUser = class {

    _apiKey;

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     */
    constructor(apiKey) {
        this._apiKey = apiKey;
    }
};