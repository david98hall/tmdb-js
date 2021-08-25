/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const section = require('../section');

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
     * @returns A Promise of keyword details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    // TODO [david98hall, 2021-08-14]: Implement GET /keyword/{keyword_id}/movies? It is not recommended to be used.
}

/**
 * A class that represents the keyword section in TMDb.
 */
exports.KeywordSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.KEYWORD, undefined, apiKey, language);
    }

    /**
     * Gets the keyword with the passed id.
     * @param {string} id The id of the keyword to get.
     * @returns A Keyword object with the passed id.
     */
    getKeyword(id) {
        return new exports.Keyword(id, this);
    }
}