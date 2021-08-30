/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific network in TMDb.
 */
exports.Network = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the network.
     * @param {exports.NetworkSection} networkSection The parent NetworkSection.
     */
    constructor(id, networkSection) {
        super(id, networkSection);
    }

    /**
     * Gets all details about this network.
     * @returns {Promise<*>} A Promise of JSON data with network details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the alternative titles of the network in question.
     * @returns {Promise<*>} A Promise of JSON data with alternative titles.
     */
    async getAlternativeNamesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.ALTERNATIVE_NAMES);
    }

    /**
     * Gets the images of the network in question.
     * @returns {Promise<*>} A Promise of JSON data with network images.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }
}

/**
 * A class that represents the network section in TMDb.
 */
exports.NetworkSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.NETWORK, undefined, apiKey, language);
    }

    /**
     * Gets a Network instance, based on the passed ID.
     * @param {string} id The ID of the network.
     * @returns {exports.Network} A Network object with the passed ID.
     */
    getNetwork(id) {
        return new exports.Network(id, this);
    }
}