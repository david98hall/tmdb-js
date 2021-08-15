/**@module tmdb-js/sections/types */

const Section = require('./section').Section;

// TMDB utilities
const tmdbUtils = require('../../utils/tmdb_utils');
const actionTypes = tmdbUtils.actionTypes;

exports.RateableSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} name The name of this section.
     * @param {exports.Section} parent The parent section of this section.
     * @param {string} apiKey The TMDB API key.
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
     * @returns A Promise of a boolean value, which will be true
     * if the rating is successful.
     */
    async rate(rating, sessionId, guestSessionId = null) {

        var urlPath = this.createChild(actionTypes.RATING).toString();

        // Build the URL parameters
        var urlParameters = {
            "api_key": this._apiKey,
        }
        tmdbUtils.addSessionIdParameter(urlParameters, sessionId, guestSessionId);

        // Ensure that the rating is in the acceptable range
        var requestBody = { "value": Math.min(Math.max(0.5, rating), 10) };

        // Await the rating to be done
        var successful = await tmdbUtils.post(urlPath, urlParameters, requestBody);
        return successful;
    }

    /**
     * Deletes the rating from the movie in question.
     * The sessionId and guestSessionId parameters are mutually exclusive.
     * 
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     * 
     * @returns A Promise of a boolean value, which will be true if the deletion was successful.
     */
    async deleteRating(sessionId, guestSessionId = null) {
        
        var urlPath = this.createChild(actionTypes.RATING).toString();

        // Build the URL parameters
        var urlParameters = {
            "api_key": this._apiKey,
        }
        tmdbUtils.addSessionIdParameter(urlParameters, sessionId, guestSessionId);

        var successful = await tmdbUtils.delete(urlPath, urlParameters);
        return successful;
    }

}