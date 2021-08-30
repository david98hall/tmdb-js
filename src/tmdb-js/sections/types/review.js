/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const section = require('../section');

/**
 * A class that represents a specific review in TMDb.
 */
exports.Review = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the review.
     * @param {exports.ReviewSection} reviewSection The parent ReviewSection.
     */
    constructor(id, reviewSection) {
        super(id, reviewSection);
    }

    /**
     * Gets the review details based on the passed id.
     * @returns {Promise<*>} A Promise of JSON data with review details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }
}

/**
 * A class that represents the review section in TMDb.
 */
exports.ReviewSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.REVIEW, undefined, apiKey, language);
    }

    /**
     * Gets the review with the passed ID.
     * @param {string} id The ID of the review to get.
     * @returns {exports.Review} A Review object with the passed ID.
     */
    getReview(id) {
        return new exports.Review(id, this);
    }
}