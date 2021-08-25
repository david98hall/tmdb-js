/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific gues session in TMDb.
 */
exports.GuestSession = class extends section.Section {

    /**
     * Initializes this object.
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
    async getRatedMoviesAsync() {
        return await this.createChild(dataTypes.RATED).getChildQueryResultAsync(sections.MOVIE);
    }

    /**
     * Gets the rated TV shows of this guest session.
     * @returns A Promise of rated TV show data.
     */
    async getRatedTvShowsAsync() {
        return await this.createChild(dataTypes.RATED).getChildQueryResultAsync(sections.TV_SHOW);
    }

    /**
     * Gets the rated TV show episodes of this guest session.
     * @returns A Promise of rated TV show episode data.
     */
    async getRatedTvShowEpisodesAsync() {
        return await this.createChild(dataTypes.RATED).getChildQueryResultAsync(sections.EPISODES);
    }
}

/**
 * A class that represents the guest session section in TMDb.
 */
exports.GuestSessionSection = class extends section.Section {

    /**
     * Initializes this object.
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