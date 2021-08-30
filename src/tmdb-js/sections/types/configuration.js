/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * A class that represents the configuration section in TMDb.
 */
exports.ConfigurationSection = class extends Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.CONFIGURATION, undefined, apiKey, language);
    }

    /**
     * Gets the system wide TMDb API configuration information.
     * @returns {Promise<*>}  A Promise of configuration data.
     */
    async getApiConfigurationAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the countries used in TMDb.
     * @returns {Promise<*>}  A Promise of country data.
     */
    async getCountriesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.COUNTRIES);
    }

    /**
     * Gets the jobs and departments used in TMDb.
     * @returns {Promise<*>}  A Promise of job/department data.
     */
    async getJobsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.JOBS);
    }

    /**
     * Gets the languages used in TMDb.
     * @returns {Promise<*>}  A Promise of language data.
     */
    async getLanguagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.LANGUAGES);
    }

    /**
     * Gets the officially supported translations in TMDb.
     * @returns {Promise<*>}  A Promise of translation data.
     */
    async getPrimaryTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.PRIMARY_TRANSLATIONS);
    }

    /**
     * Gets the timezones used in TMDb.
     * @returns {Promise<*>}  A Promise of timezone data.
     */
    async getTimezonesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TIMEZONES);
    }
}