/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * A class that represents the genre section in TMDb.
 */
exports.GenreSection = class extends Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.GENRE, undefined, apiKey, language);
    }

    /**
     * Gets movie genres.
     * @returns {Promise<*>} A Promise of movie genre data.
     */
    async getMovieGenresAsync() {
        return await this.createChild(sections.MOVIE)
            .createChild(sections.LIST)
            .getQueryResultAsync();
    }

    /**
     * Gets TV show genres.
     * @returns {Promise<*>} A Promise of TV show genre data.
     */
    async getTvShowGenresAsync() {
        return await this.createChild(sections.TV_SHOW)
            .createChild(sections.LIST)
            .getQueryResultAsync();
    }
}