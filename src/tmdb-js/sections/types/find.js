/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * Can get data from external sources via TMDB.
 */
exports.FindSection = class extends Section {

    /**
     * The external source.
     */
    _externalSource;

    /**
     * Sets properties.
     * @param {string} externalSource The time window of this trending section (see tmdb_utils.externalSources).
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(externalSource, apiKey, language = "en-US") {
        super(sections.FIND, undefined, apiKey, language);
        this._externalSource = externalSource;
    }

    /**
     * Finds media with the passed ID in the external source in question.
     * @param {string} externalId The external ID of the media. 
     * @returns A Promise of JSON data.
     */
    async findAsync(externalId) {

        let idChild = this.createChild(externalId);

        let parameters = {
            "api_key": this._apiKey,
            "language": this._language,
            "external_source": this._externalSource
        };
        
        return await tmdbUtils.getDataAsync(idChild.toString(), parameters);
    }
}