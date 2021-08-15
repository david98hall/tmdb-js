/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get collection data from TMDB.
 */
exports.Collection = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The id of the collection.
     * @param {CollectionSection} collectionSection The parent CollectionSection.
     */
    constructor(id, collectionSection) {
        super(id, collectionSection);
    }

    /**
     * Gets the collection details based on the passed id. 
     * @returns A Promise of collection details.
     */
    getDetails() {
        return this.getQueryResult();
    }

    /**
     * Gets the images of the collection in question.
     * @returns A Promise of collection images.
     */
    getImages() {
        return this.getChildQueryResult(dataTypes.IMAGES);
    }

    /**
     * Gets the translations of the collection in question.
     * @returns A Promise of collection translations.
     */ 
    getTranslations() {
        return this.getChildQueryResult(dataTypes.TRANSLATIONS);
    }

}

/**
 * Can get collection data from TMDB.
 */
exports.CollectionSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.COLLECTION, undefined, apiKey, language);
    }

    /**
     * Gets the collection with the passed id.
     * @param {Number} id The id of the collection to get.
     */
    getCollection(id) {
        return new exports.Collection(id, this);
    }

}