/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const section = require('../section');

/**
 * Can get credit data from TMDB.
 */
exports.Credit = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} id The id of the credit.
     * @param {exports.CreditSection} creditSection The parent CreditSection.
     */
    constructor(id, creditSection) {
        super(id, creditSection);
    }

    /**
     * Gets the credit details.
     * @returns A Promise of credit details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

}

/**
 * Can get credit data from TMDB.
 */
exports.CreditSection = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.CREDIT, undefined, apiKey, language);
    }

    /**
     * Gets the credit with the passed id.
     * @returns A Credit instance with the passed id.
     */
    getCredit(id) {
        return new exports.Credit(id, this);
    }

}