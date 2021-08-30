/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific guest session in TMDb.
 */
exports.GuestSession = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The guest session id.
     * @param {exports.GuestSessionSection} guestSessionSection The parent guest session section.
     */
    constructor(id, guestSessionSection) {
        super(id, guestSessionSection);
    }

    /**
     * Gets the rated movies of this guest session.
     * @param {string} sortBy The sorting type
     * (see tmdb_utils.sortingTypes, although only CREATED_AT.ASC and CREATED_AT_DESC are valid).
     * @returns {Promise<*>} A Promise of rated movie data.
     */
    async getRatedMoviesAsync(sortBy = undefined) {

        let urlParameters = {"sort_by": sortBy};

        return await this.createChild(dataTypes.RATED)
            .getChildQueryResultAsync(sections.MOVIE, urlParameters);
    }

    /**
     * Gets the rated TV shows of this guest session.
     * @param {string} sortBy The sorting type
     * (see tmdb_utils.sortingTypes, although only CREATED_AT.ASC and CREATED_AT_DESC are valid).
     * @returns {Promise<*>} A Promise of rated TV show data.
     */
    async getRatedTvShowsAsync(sortBy = undefined) {

        let urlParameters = {"sort_by": sortBy};

        return await this.createChild(dataTypes.RATED)
            .getChildQueryResultAsync(sections.TV_SHOW, urlParameters);
    }

    /**
     * Gets the rated TV show episodes of this guest session.
     * @param {string} sortBy The sorting type
     * (see tmdb_utils.sortingTypes, although only CREATED_AT.ASC and CREATED_AT_DESC are valid).
     * @returns {Promise<*>} A Promise of rated TV show episode data.
     */
    async getRatedTvShowEpisodesAsync(sortBy = undefined) {

        let urlParameters = {"sort_by": sortBy};

        return await this.createChild(dataTypes.RATED)
            .getChildQueryResultAsync(sections.EPISODES, urlParameters);
    }
}

/**
 * A class that represents the guest session section in TMDb.
 */
exports.GuestSessionSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
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