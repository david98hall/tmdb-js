/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get data about a guest session.
 */
exports.GuestSession = class extends Section {

    /**
     * Initializes this GuestSession.
     * @param {string} id 
     * @param {exports.GuestSessionSection} guestSessionSection 
     */
    constructor(id, guestSessionSection) {
        super(id, guestSessionSection);
    }

    /**
     * Gets the rated movies of this guest session.
     * @returns A Promise of rated movie data.
     */
    getRatedMovies() {
        return this.createChild(dataTypes.RATED).getChildQueryResult(sections.MOVIE);
    }

    /**
     * Gets the rated TV shows of this guest session.
     * @returns A Promise of rated TV show data.
     */
    getRatedTvShows() {
        return this.createChild(dataTypes.RATED).getChildQueryResult(sections.TV_SHOW);
    }

    /**
     * Gets the rated TV show episodes of this guest session.
     * @returns A Promise of rated TV show episode data.
     */
    getRatedTvShowEpisodes() {
        return this.createChild(dataTypes.RATED).getChildQueryResult(sections.EPISODES);
    }

}

/**
 * Can get data about guest sessions from TMDB.
 */
exports.GuestSessionSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.GUEST_SESSION, apiKey, language);
    }

    /**
     * Gets a GuestSession object with the passed id.
     * @param {string} id The guest session id.
     */
    getGuestSession(id) {
        return new exports.GuestSession(id, this);
    }

}