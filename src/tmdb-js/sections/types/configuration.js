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
    getApiConfiguration() {
        return this.getQueryResult();
    }

    /**
     * Gets the countries used in TMDB.
     * @returns A Promise of country data.
     */
    getCountries() {
        return this.getChildQueryResult(dataTypes.COUNTRIES);
    }

    /**
     * Gets the jobs and departments used in TMDB.
     * @returns A Promise of job/department data.
     */
    getJobs() {
        return this.getChildQueryResult(dataTypes.JOBS);
    }

    /**
     * Gets the languages used in TMDB.
     * @returns A Promise of language data.
     */
    getLanguages() {
        return this.getChildQueryResult(dataTypes.LANGUAGES);
    }

    /**
     * Gets the officially supported translations in TMDB.
     * @returns A Promise of translation data.
     */
    getPrimaryTranslations() {
        return this.getChildQueryResult(dataTypes.PRIMARY_TRANSLATIONS);
    }

    /**
     * Gets the timezones used in TMDB.
     * @returns A Promise of timezone data.
     */
    getTimezones() {
        return this.getChildQueryResult(dataTypes.TIMEZONES);
    }

}