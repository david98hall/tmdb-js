/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * A class that represents the find section in TMDb.
 */
exports.FindSection = class extends Section {

    /**
     * The external source.
     */
    _externalSource;

    /**
     * Initializes this object.
     * @param {string} externalSource The time window of this trending section (see tmdb_utils.externalSources).
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(externalSource, apiKey, language = "en-US") {
        super(sections.FIND, undefined, apiKey, language);
        this._externalSource = externalSource;
    }

    /**
     * Finds media with the passed ID in the external source in question.
     * @param {string} externalId The external ID of the media (see tmdb_utils.externalSources for valid values).
     * @returns {Promise<*>} A Promise of JSON data.
     */
    async findAsync(externalId) {
        let parameters = {"external_source": this._externalSource};
        return await this.getChildQueryResultAsync(externalId, parameters)
    }
}