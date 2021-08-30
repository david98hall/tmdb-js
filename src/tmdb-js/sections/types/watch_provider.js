/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');
const {Section} = require("../section");

exports.WatchProvidersSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.PROVIDERS, new Section(sections.WATCH, null, apiKey, language), apiKey, language);
    }

    /**
     * Gets the available regions of watch providers.
     * @returns {Promise<*>} A Promise of region data in JSON format.
     */
    async getAvailableRegionsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.REGIONS);
    }

    /**
     * Gets the movie providers.
     * @param {string} watchRegion The watch region.
     * @returns {Promise<*>} A Promise of movie provider data in JSON format.
     */
    async getMovieProvidersAsync(watchRegion = undefined) {
        let urlParameters = {"watch_region": watchRegion};
        return await this.getChildQueryResultAsync(sections.MOVIE, urlParameters);
    }

    /**
     * Gets the TV show providers.
     * @param {string} watchRegion The watch region.
     * @returns {Promise<*>} A Promise of TV show provider data in JSON format.
     */
    async getTvShowProvidersAsync(watchRegion = undefined) {
        let urlParameters = {"watch_region": watchRegion};
        return await this.getChildQueryResultAsync(sections.TV_SHOW, urlParameters);
    }
}