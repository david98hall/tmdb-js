/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * Can get network data on TMDB.
 */
exports.Network = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} id The id of the network.
     * @param {exports.NetworkSection} networkSection The parent NetworkSection.
     */
    constructor(id, networkSection) {
        super(id, networkSection);
    }

    /**
     * Gets all details about this network.
     * @returns A Promise of JSON data with network details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the alternative titles of the network in question.
     * @returns A Promise of JSON data with alternative titles.
     */
    async getAlternativeNamesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.ALTERNATIVE_NAMES);
    }

    /**
     * Gets the images of the network in question.
     * @returns A Promise of JSON data with network images.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }
}

/**
 * Can get network data from the TMDB API.
 */
exports.NetworkSection = class extends section.Section {
    
    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.NETWORK, undefined, apiKey, language);
    }

    /**
     * Gets a Network instance, based on the passed ID.
     * @param {string} id The ID of the network.
     * @returns A Network object with the passed ID.
     */
    getNetwork(id) {
        return new exports.Network(id, this);
    }
}