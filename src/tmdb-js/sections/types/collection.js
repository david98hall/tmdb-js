/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents the collection section in TMDb.
 */
exports.Collection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the collection.
     * @param {exports.CollectionSection} collectionSection The parent CollectionSection.
     */
    constructor(id, collectionSection) {
        super(id, collectionSection);
    }

    /**
     * Gets the collection details based on the passed id.
     * @returns {Promise<*>}  A Promise of collection details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the images of the collection in question.
     * @returns {Promise<*>}  A Promise of collection images.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    /**
     * Gets the translations of the collection in question.
     * @returns {Promise<*>}  A Promise of collection translations.
     */
    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }
}

/**
 * Can get collection data from TMDb.
 */
exports.CollectionSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.COLLECTION, undefined, apiKey, language);
    }

    /**
     * Gets the collection with the passed id.
     * @param {string} id The id of the collection to get.
     * @returns {exports.Collection} A Collection object with the passed id.
     */
    getCollection(id) {
        return new exports.Collection(id, this);
    }
}