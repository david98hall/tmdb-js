/**@module tmdb-js/sections/types */

// HTTP utilities
const httpUtils = require('../../../utils/http_utils');
const httpMethod = httpUtils.httpMethod;

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get review data from TMDB.
 */
exports.ReviewSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.REVIEW, undefined, apiKey, language);
    }

    /**
     * Gets the review details with the passed id.
     * @param {string} id The review id. 
     * @returns A Promise of review details.
     */
    getDetails(id) {
        return new Section(id, this).getQueryResult();
    }

}