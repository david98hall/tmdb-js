/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * Can get review data from TMDB.
 */
exports.Review = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The id of the review.
     * @param {ReviewSection} reviewSection The parent ReviewSection.
     */
    constructor(id, reviewSection) {
        super(id, reviewSection);
    }

    /**
     * Gets the review details based on the passed id.
     * @returns A Promise of review details.
     */
    getDetails() {
        return this.getQueryResult();
    }

}

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
     * Gets the review with the passed id.
     * @param {Number} id The id of the review to get.
     */
    getReview(id) {
        return new exports.Review(id, this);
    }

}