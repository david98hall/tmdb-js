const tmdbUtils = require('../../utils/tmdb_utils');
const Section = require('./section').Section;

/**
 * Template class for getting and handling section data on TMDB.
 */
exports.Subsection = class extends Section {

    _subSectionId;

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} section The section.
     * @param {Number} subSectionId The id of the sub section.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, section, subSectionId, language = "en-US") {
        super(apiKey, section, language);
        this._subSectionId = subSectionId;
    }

     /**
     * Gets section data of the specified type.
     * @param {string} section The section.
     * @param {string} dataType The type of the data to get.
     * @returns A Promise of section data.
     */
    _getSectionData = (dataType) => {
        return tmdbUtils.getSectionData(
            this._section, this._subSectionId, dataType, this._apiKey, this._language);
    }
}