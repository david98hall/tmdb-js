/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * Can get person data from TMDB.
 */
exports.Person = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} id The id of the person.
     * @param {exports.PeopleSection} personSection The parent PersonSection.
     */
    constructor(id, personSection) {
        super(id, personSection);
    }

    /**
     * Gets all details about this person.
     * @returns A Promise of this person's details.
     */
    async getDetailsAsync(...appendToResponse) {

        let urlParameters = null;

        if (appendToResponse.length > 0) {
            urlParameters = {
                ...this._getBaseUrlParameters(),
                "append_to_response": appendToResponse.join(",")
            }
        }

        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the changes of the person in question.
     * @returns A Promise of this person's changes.
     */
    async getChangesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CHANGES);
    }
        
    /**
     * Gets the movie credits of this person.
     * @returns A Promise of this person's movie credits.
     */
    async getMovieCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.MOVIE_CREDITS);
    }

    /**
     * Gets the TV credits of this person.
     * @returns A Promise of this person's TV credits.
     */
    async getTvCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TV_CREDITS);
    }

    /**
     * Gets the combined credits of this person.
     * @returns A Promise of this person's combined credits.
     */
    async getCombinedCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.COMBINED_CREDITS);
    }

    /**
     * Gets the external IDs of this person.
     * @returns A Promise of external IDs.
     */
    async getExternalIdsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.EXTERNAL_IDS)
    }

    /**
     * Gets the images of this person.
     * @returns A Promise of images of this person.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    /**
     * Gets the tagged images of this person.
     * @returns A Promise of tagged images of this person.
     */
    async getTaggedImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TAGGED_IMAGES);
    }

    /**
     * Gets the translations of this person.
     * @returns A Promise of person translations.
     */ 
    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }
}

/**
 * Can get data about people in general from the TMDB API.
 */
exports.PeopleSection = class extends section.Section {
    
    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.PERSON, undefined, apiKey, language);
    }

    /**
     * Gets a Person instance with the passed id.
     * @param {string} id The ID of the person.
     * @returns A Person instance.
     */
    getPerson(id) {
        return new exports.Person(id, this);
    }

    /**
     * Gets the latest created person.
     */
    async getLatestAsync() {
        return await this.getChildQueryResultAsync(dataTypes.LATEST);
    }

    /**
     * Gets popular people.
     */
    async getPopularAsync() {
        return await this.getChildQueryResultAsync(dataTypes.POPULAR);
    }
}