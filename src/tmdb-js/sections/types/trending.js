/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const mediaTypes = tmdbUtils.mediaTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get data about trending media from TMDB.
 */
exports.TrendingSection = class extends Section {

    /**
     * The time window of this trending section.
     */
    _timeWindow;

    /**
     * Sets properties.
     * @param {string} timeWindow The time window of this trending section (see tmdb_utils.timeWindows).
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(timeWindow, apiKey, language = "en-US") {
        super(sections.TRENDING, undefined, apiKey, language);
        this._timeWindow = timeWindow;
    }

    /**
     * Gets the all trending media (movies, TV shows, people)
     * in the passed time window. See tmdb_utils.timeWindow for the valid types.
     */
    getAll() {
        return this.createChild(mediaTypes.ALL)
                   .createChild(this._timeWindow)
                   .getQueryResult();
    }

    /**
     * Gets the trending movies in the passed time window.
     * See tmdb_utils.timeWindow for the valid types.
     */
    getMovies() {
        return this.createChild(mediaTypes.MOVIE)
                   .createChild(this._timeWindow)
                   .getQueryResult();
    }

    /**
     * Gets the trending TV shows in the passed time window.
     * See tmdb_utils.timeWindow for the valid types.
     */
    getTvShows() {
        return this.createChild(mediaTypes.TV)
                   .createChild(this._timeWindow)
                   .getQueryResult();
    }

    /**
     * Gets the trending people in the passed time window.
     * See tmdb_utils.timeWindow for the valid types.
     */
    getPeople() {
        return this.createChild(mediaTypes.PERSON)
                   .createChild(this._timeWindow)
                   .getQueryResult();
    }

}