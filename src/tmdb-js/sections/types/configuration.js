/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get TMDB configuration data.
 */
exports.ConfigurationSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.CONFIGURATION, undefined, apiKey, language);
    }

    /**
     * Gets the system wide TMDB API configuration information.
     * @returns A Promise of configuration data.
     */
    async getApiConfigurationAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the countries used in TMDB.
     * @returns A Promise of country data.
     */
    async getCountriesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.COUNTRIES);
    }

    /**
     * Gets the jobs and departments used in TMDB.
     * @returns A Promise of job/department data.
     */
    async getJobsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.JOBS);
    }

    /**
     * Gets the languages used in TMDB.
     * @returns A Promise of language data.
     */
    async getLanguagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.LANGUAGES);
    }

    /**
     * Gets the officially supported translations in TMDB.
     * @returns A Promise of translation data.
     */
    async getPrimaryTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.PRIMARY_TRANSLATIONS);
    }

    /**
     * Gets the timezones used in TMDB.
     * @returns A Promise of timezone data.
     */
    async getTimezonesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TIMEZONES);
    }
}