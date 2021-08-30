/**@module tmdb-js/api */

const TmdbApiUser = require('./tmdb_api_user').TmdbApiUser;

/**
 * Can make TMDb queries based on an API key and a specified natural language.
 */
exports.TmdbQuerier = class extends TmdbApiUser {

    _language;

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The natural language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey);
        this._language = language;
    }
};