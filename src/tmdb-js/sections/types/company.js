/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific company in TMDb.
 */
exports.Company = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the review.
     * @param {exports.CompanySection} companySection The parent CompanySection.
     */
    constructor(id, companySection) {
        super(id, companySection);
    }

    /**
     * Gets the company details based on the passed id.
     * @returns {Promise<*>}  A Promise of company details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the alternative names of this company
     * @returns {Promise<*>}  A Promise of alternative names.
     */
    async getAlternativeNamesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.ALTERNATIVE_NAMES);
    }

    /**
     * Gets images of this company.
     * @returns {Promise<*>}  A Promise of company images.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }
}

/**
 * A class that represents the company section in TMDb.
 */
exports.CompanySection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.COMPANY, undefined, apiKey, language);
    }

    /**
     * Gets the company with the passed id.
     * @param {string} id The id of the review to get.
     * @returns {exports.Company} A Company instance with the passed id.
     */
    getCompany(id) {
        return new exports.Company(id, this);
    }
}