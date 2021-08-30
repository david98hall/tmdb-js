/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const mediaTypes = tmdbUtils.mediaTypes;

// Sections
const Section = require('../section').Section;

/**
 * A class that represents the trending section in TMDb.
 */
exports.TrendingSection = class extends Section {

    /**
     * The time window of this trending section.
     */
    _timeWindow;

    /**
     * Initializes this object.
     * @param {string} timeWindow The time window of this trending section (see tmdb_utils.timeWindows).
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(timeWindow, apiKey, language = "en-US") {
        super(sections.TRENDING, undefined, apiKey, language);
        this._timeWindow = timeWindow;
    }

    /**
     * Gets the all trending media (movies, TV shows, people)
     * in the passed time window. See tmdb_utils.timeWindow for the valid types.
     *
     * @returns {Promise<*>} A Promise of trending media data in JSON format.
     */
    async getAllAsync() {
        return await this.createChild(mediaTypes.ALL)
            .createChild(this._timeWindow)
            .getQueryResultAsync();
    }

    /**
     * Gets the trending movies in the passed time window.
     * See tmdb_utils.timeWindow for the valid types.
     *
     * @returns {Promise<*>} A Promise of trending movie data in JSON format.
     */
    async getMoviesAsync() {
        return await this.createChild(mediaTypes.MOVIE)
            .createChild(this._timeWindow)
            .getQueryResultAsync();
    }

    /**
     * Gets the trending TV shows in the passed time window.
     * See tmdb_utils.timeWindow for the valid types.
     *
     * @returns {Promise<*>} A Promise of trending TV show data in JSON format.
     */
    async getTvShowsAsync() {
        return await this.createChild(mediaTypes.TV)
            .createChild(this._timeWindow)
            .getQueryResultAsync();
    }

    /**
     * Gets the trending people in the passed time window.
     * See tmdb_utils.timeWindow for the valid types.
     *
     * @returns {Promise<*>} A Promise of trending people data in JSON format.
     */
    async getPeopleAsync() {
        return await this.createChild(mediaTypes.PERSON)
            .createChild(this._timeWindow)
            .getQueryResultAsync();
    }
}