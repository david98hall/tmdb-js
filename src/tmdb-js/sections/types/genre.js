/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * Can get genre data from TMDB.
 */
exports.GenreSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.GENRE, undefined, apiKey, language);
    }

    /**
     * Gets movie genres.
     * @return A Promise of movie genre data.
     */
    async getMovieGenresAsync() {
        return await this.createChild(sections.MOVIE)
                         .createChild(sections.LIST)
                         .getQueryResultAsync();
    }

    /**
     * Gets TV show genres.
     * @return A Promise of TV show genre data.
     */
    async getTvShowGenresAsync() {
        return await this.createChild(sections.TV_SHOW)
                         .createChild(sections.LIST)
                         .getQueryResultAsync();
    }
}