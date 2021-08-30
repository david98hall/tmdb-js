/**@module tmdb-js/sections */

const tmdbQuerier = require('../api/tmdb_querier');
const tmdbUtils = require('../../utils/tmdb_utils');

/**
 * Template class for getting and handling general section data.
 */
exports.Section = class extends tmdbQuerier.TmdbQuerier {

    /**
     * The name of this section.
     */
    _name;

    /**
     * The parent of this section.
     */
    _parent;

    /**
     * Initializes this object.
     * @param {string} name The name of this section.
     * @param {exports.Section} parent The parent section of this section.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(name, parent = null, apiKey = undefined, language = "en-US") {
        super(
            parent ? parent._apiKey : apiKey,
            parent ? parent._language : language
        );
        this._name = name;
        this._parent = parent;
    }

    /**
     * Gets the section data from TMDb.
     * @param {Object} urlParameters The url parameters to use.
     * If null, the API key and language of this object will be used.
     * @param {boolean} appendUrlParameters A value indicating whether to append
     * the passed URL parameters to the base set or to replace it.
     *
     * @returns {Promise<*>} A Promise of JSON data based on this section.
     */
    async getQueryResultAsync(urlParameters = {}, appendUrlParameters = true) {

        if (appendUrlParameters) {
            urlParameters = {
                ...this._getBaseUrlParameters(),
                ...urlParameters
            };
        }

        return await tmdbUtils.getDataAsync(this.toString(), urlParameters);
    }

    /**
     * Returns this section in a string format.
     *
     * @returns {string} This object as a string.
     */
    toString() {
        let parentString = this._parent == null
            ? ""
            : this._parent.toString() + "/";
        return parentString + this._name;
    }

    /**
     * Gets the query results of the child
     * section with the passed name.
     * @param {string} childName The name of the child section.
     * @param {Object} urlParameters The url parameters to use.
     * If null, the API key and language of this object will be used.
     * @param {boolean} appendUrlParameters A value indicating whether to append
     * the passed URL parameters to the base set or to replace it.
     *
     * @returns {Promise<*>} A Promise of JSON data based on the child section.
     */
    async getChildQueryResultAsync(childName, urlParameters = {}, appendUrlParameters = true) {
        return await this.createChild(childName).getQueryResultAsync(urlParameters, appendUrlParameters);
    }

    /**
     * Creates a new child section instance.
     * @param {string} name The name of the child section.
     *
     * @returns {exports.Section} A section that is a child of this one.
     */
    createChild(name) {
        return new exports.Section(name, this);
    }

    _getBaseUrlParameters() {
        return {
            "api_key": this._apiKey,
            "language": this._language,
        }
    }
}

exports.RateableSection = class extends exports.Section {

    /**
     * Sets properties.
     * @param {string} name The name of this section.
     * @param {exports.Section} parent The parent section of this section.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(name, parent = undefined, apiKey = undefined, language = "en-US") {
        super(name, parent, apiKey, language);
    }

    /**
     * Rates the movie in question. The parameters sessionId and
     * guestSessionId are mutually exclusive.
     *
     * @param {Number} rating The rating, in the range [0.5, 10].
     * @param {string} sessionId The session id.
     * @param {string} guestSessionId The guest session id.
     *
     * @returns {Promise<boolean>} A Promise of a boolean value, which will be true
     * if the rating is successful.
     */
    async rateAsync(rating, sessionId, guestSessionId = undefined) {

        let urlPath = this.createChild(tmdbUtils.actionTypes.RATING).toString();

        // Build the URL parameters
        let urlParameters = {
            "api_key": this._apiKey,
            "session_id": sessionId,
            "guest_session_id": guestSessionId
        }

        // Ensure that the rating is in the acceptable range
        let requestBody = {"value": Math.min(Math.max(0.5, rating), 10)};

        // Await the rating to be done
        return await tmdbUtils.postAsync(urlPath, urlParameters, requestBody);
    }

    /**
     * Deletes the rating from the movie in question.
     * The sessionId and guestSessionId parameters are mutually exclusive.
     *
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     *
     * @returns {Promise<boolean>} A Promise of a boolean value,
     * which will be true if the deletion was successful.
     */
    async deleteRatingAsync(sessionId, guestSessionId = undefined) {

        let urlPath = this.createChild(tmdbUtils.actionTypes.RATING).toString();

        // Build the URL parameters
        let urlParameters = {
            "api_key": this._apiKey,
            "session_id": sessionId,
            "guest_session_id": guestSessionId
        }

        return await tmdbUtils.deleteAsync(urlPath, urlParameters);
    }
}