/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * Can get company data from TMDB.
 */
exports.Company = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} id The id of the review.
     * @param {exports.CompanySection} companySection The parent CompanySection.
     */
    constructor(id, companySection) {
        super(id, companySection);
    }

    /**
     * Gets the company details based on the passed id.
     * @returns A Promise of company details.
     */
    getDetails() {
        return this.getQueryResult();
    }

    /**
     * Gets the alternative names of this company
     * @returns A Promise of alternative names.
     */
    getAlternativeNames() {
        return this.getChildQueryResult(dataTypes.ALTERNATIVE_NAMES);
    }

    /**
     * Gets images of this company. 
     * @returns A Promise of company images.
     */
    getImages() {
        return this.getChildQueryResult(dataTypes.IMAGES);
    }

}

/**
 * Can get company data from TMDB.
 */
exports.CompanySection = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.COMPANY, undefined, apiKey, language);
    }

    /**
     * Gets the company with the passed id.
     * @param {string} id The id of the review to get.
     * @return A Company instance with the passed id.
     */
    getCompany(id) {
        return new exports.Company(id, this);
    }

}