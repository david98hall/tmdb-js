/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get person data from TMDB.
 */
exports.Person = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The id of the person.
     * @param {PersonSection} personSection The parent PersonSection.
     */
    constructor(id, personSection) {
        super(id, personSection);
    }

    /**
     * Gets all details about this person.
     * @returns A Promise of this person's details.
     */
    getDetails() {
        return this.getQueryResult();
    }

    /**
     * Gets the changes of the person in question.
     * @returns A Promise of this person's changes.
     */
    getChanges() {
        return this.getChildQueryResult(dataTypes.CHANGES);
    }
        
    /**
     * Gets the movie credits of this person.
     * @returns A Promise of this person's movie credits.
     */
    getMovieCredits() {
        return this.getChildQueryResult(dataTypes.MOVIE_CREDITS);
    }

    /**
     * Gets the TV credits of this person.
     * @returns A Promise of this person's TV credits.
     */
    getTvCredits() {
        return this.getChildQueryResult(dataTypes.TV_CREDITS);
    }

    /**
     * Gets the combined credits of this person.
     * @returns A Promise of this person's combined credits.
     */
    getCombinedCredits() {
        return this.getChildQueryResult(dataTypes.COMBINED_CREDITS);
    }

    /**
     * Gets the external IDs of this person.
     * @returns A Promise of external IDs.
     */
    getExternalIds() { 
        return this.getChildQueryResult(dataTypes.EXTERNAL_IDS)
    }

    /**
     * Gets the images of this person.
     * @returns A Promise of images of this person.
     */
    getImages() {
        return this.getChildQueryResult(dataTypes.IMAGES);
    }

    /**
     * Gets the tagged images of this person.
     * @returns A Promise of tagged images of this person.
     */
    getImages() {
        return this.getChildQueryResult(dataTypes.TAGGED_IMAGES);
    }

    /**
     * Gets the translations of this person.
     * @returns A Promise of person translations.
     */ 
    getTranslations() {
        return this.getChildQueryResult(dataTypes.TRANSLATIONS);
    }
}

/**
 * Can get data about people in general from the TMDB API.
 */
exports.PeopleSection = class extends Section {
    
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
     * @param {Number} id The ID of the person.
     * @returns A Person instance.
     */
    getPerson(id) {
        return new exports.Person(id, this);
    }

    /**
     * Gets the latest created person.
     */
    getLatest() {
        return this.getChildQueryResult(dataTypes.LATEST);
    }

    /**
     * Gets popular people.
     */
    getPopular() {
        return this.getChildQueryResult(dataTypes.POPULAR);
    }
}