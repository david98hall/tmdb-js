/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific person in TMDb.
 */
exports.Person = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the person.
     * @param {exports.PeopleSection} personSection The parent PersonSection.
     */
    constructor(id, personSection) {
        super(id, personSection);
    }

    /**
     * Gets all details about this person.
     * @returns {Promise<*>} A Promise of this person's details in JSON format.
     */
    async getDetailsAsync(...appendToResponse) {

        let urlParameters = appendToResponse.length > 0
            ? {"append_to_response": appendToResponse.join(",")}
            : {};

        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the changes of the person in question.
     *
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     *
     * @returns {Promise<*>} A Promise of JSON data with person changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        let urlParameters = {"start_date": startDate, "end_date": endDate, "page": page};
        return await this.getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
    }

    /**
     * Gets the movie credits of this person.
     * @returns {Promise<*>} A Promise of this person's movie credits in JSON format.
     */
    async getMovieCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.MOVIE_CREDITS);
    }

    /**
     * Gets the TV credits of this person.
     * @returns {Promise<*>} A Promise of this person's TV credits in JSON format.
     */
    async getTvCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TV_CREDITS);
    }

    /**
     * Gets the combined credits of this person.
     * @returns {Promise<*>} A Promise of this person's combined credits in JSON format.
     */
    async getCombinedCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.COMBINED_CREDITS);
    }

    /**
     * Gets the external IDs of this person.
     * @returns {Promise<*>} A Promise of this person's external IDs in JSON format.
     */
    async getExternalIdsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.EXTERNAL_IDS)
    }

    /**
     * Gets the images of this person.
     * @returns {Promise<*>} A Promise of images of this person in JSON format.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    /**
     * Gets the tagged images of this person.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of tagged images of this person in JSON format.
     */
    async getTaggedImagesAsync(page = null) {
        let urlParameters = { "page": page };
        return await this.getChildQueryResultAsync(dataTypes.TAGGED_IMAGES, urlParameters);
    }

    /**
     * Gets the translations of this person.
     * @returns {Promise<*>} A Promise of person translations in JSON format.
     */
    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }
}

/**
 * A class that represents the people section in TMDb.
 */
exports.PeopleSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.PERSON, undefined, apiKey, language);
    }

    /**
     * Gets a Person instance with the passed ID.
     * @param {string} id The ID of the person.
     * @returns {exports.Person} A Person object with the passed ID.
     */
    getPerson(id) {
        return new exports.Person(id, this);
    }

    /**
     * Gets person changes.
     *
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     *
     * @returns {Promise<*>} A Promise of JSON data with person changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        let urlParameters = {"start_date": startDate, "end_date": endDate, "page": page};
        return await this.getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
    }

    /**
     * Gets the latest created person.
     * @returns {Promise<*>} A Promise of JSON data with the latest people.
     */
    async getLatestAsync() {
        return await this.getChildQueryResultAsync(dataTypes.LATEST);
    }

    /**
     * Gets popular people.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of JSON data with popular people.
     */
    async getPopularAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.POPULAR, urlParameters);
    }
}