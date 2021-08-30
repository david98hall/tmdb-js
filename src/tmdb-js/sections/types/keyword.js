/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const section = require('../section');
const {dataTypes} = require("../../../utils/tmdb_utils");

/**
 * A class that represents a specific keyword in TMDb.
 */
exports.Keyword = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the keyword.
     * @param {exports.KeywordSection} keywordSection The parent KeywordSection.
     */
    constructor(id, keywordSection) {
        super(id, keywordSection);
    }

    /**
     * Gets the keyword details based on the passed id.
     * @returns {Promise<*>} A Promise of keyword details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the movies that belong to this keyword.
     * @param includeAdult A value indicating whether or not to include adult content.
     * @returns {Promise<*>} A Promise of movie data in JSON format.
     */
    async getMovies(includeAdult = true) {
        let urlParameters = { "include_adult": includeAdult };
        return await this.getChildQueryResultAsync(dataTypes.MOVIES, urlParameters);
    }
}

/**
 * A class that represents the keyword section in TMDb.
 */
exports.KeywordSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.KEYWORD, undefined, apiKey, language);
    }

    /**
     * Gets the keyword with the passed id.
     * @param {string} id The id of the keyword to get.
     * @returns {exports.Keyword} A Keyword object with the passed id.
     */
    getKeyword(id) {
        return new exports.Keyword(id, this);
    }
}