/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const section = require('../section');

/**
 * A class that represents a specific credit in TMDb.
 */
exports.Credit = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the credit.
     * @param {exports.CreditSection} creditSection The parent CreditSection.
     */
    constructor(id, creditSection) {
        super(id, creditSection);
    }

    /**
     * Gets the credit details.
     * @returns {Promise<*>} A Promise of credit details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }
}

/**
 * A class that represents the credit section in TMDb.
 */
exports.CreditSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.CREDIT, undefined, apiKey, language);
    }

    /**
     * Gets the credit with the passed id.
     * @returns {exports.Credit} A Credit instance with the passed id.
     */
    getCredit(id) {
        return new exports.Credit(id, this);
    }
}