const TmdbQuerier = require('../api/tmdb_querier').TmdbQuerier;

/**
 * Template class for getting and handling general section data.
 */
exports.Section = class extends TmdbQuerier {

    _section;

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} section The section.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, section, language = "en-US") {
        super(apiKey, language);
        this._section = section;
    }
}