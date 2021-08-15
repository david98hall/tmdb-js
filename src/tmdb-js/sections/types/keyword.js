/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * Can get keyword data from TMDB.
 */
exports.Keyword = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The id of the keyword.
     * @param {KeywordSection} keywordSection The parent KeywordSection.
     */
    constructor(id, keywordSection) {
        super(id, keywordSection);
    }

    /**
     * Gets the keyword details based on the passed id.
     * @returns A Promise of keyword details.
     */
    getDetails() {
        return this.getQueryResult();
    }

    // TODO [david98hall, 2021-08-14]: Implement GET /keyword/{keyword_id}/movies? It is not recommended to be used.

}

/**
 * Can get keyword data from TMDB.
 */
exports.KeywordSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.KEYWORD, undefined, apiKey, language);
    }

    /**
     * Gets the keyword with the passed id.
     * @param {Number} id The id of the keyword to get.
     */
    getKeyword(id) {
        return new exports.Keyword(id, this);
    }

}