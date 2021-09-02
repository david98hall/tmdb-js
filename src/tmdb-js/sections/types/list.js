/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;
const actionTypes = tmdbUtils.actionTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific list in TMDb.
 */
exports.List = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the list.
     * @param {exports.ListSection} listSection The parent ListSection.
     */
    constructor(id, listSection) {
        super(id, listSection);
    }

    /**
     * Gets all details about this list.
     * @returns {Promise<*>} A Promise of list details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the item status of a movie in relation to this list.
     * @param {string} movieId The ID of the movie to get the status about.
     * @returns {Promise<*>} A Promise of item status data.
     */
    async getItemStatusAsync(movieId) {
        let urlParameters = {"movie_id": movieId};
        return await this.getChildQueryResultAsync(dataTypes.ITEM_STATUS, urlParameters);
    }

    /**
     * Adds a movie to this list.
     * @param {string} movieId The movie id.
     * @param {string} sessionId The session id.
     * @returns {Promise<boolean>} A Promise of a boolean value indicating whether the addition was successful or not.
     */
    async addMovieAsync(movieId, sessionId) {
        let requestBody = {"media_id": movieId};
        let addItemSection = this.createChild(actionTypes.ADD_ITEM);
        return await tmdbUtils.postAsync(addItemSection.toString(), this._getUrlParameters(sessionId), requestBody);
    }

    /**
     * Removes a movie from this list.
     * @param {string} movieId The movie id.
     * @param {string} sessionId The session id.
     * @returns {Promise<boolean>} A Promise of a boolean value indicating whether the removal was successful or not.
     */
    async removeMovieAsync(movieId, sessionId) {
        let requestBody = {"media_id": movieId};
        let removeItemSection = this.createChild(actionTypes.REMOVE_ITEM);
        return await tmdbUtils.postAsync(removeItemSection.toString(), this._getUrlParameters(sessionId), requestBody);
    }

    /**
     * Clears this list.
     * @param {string} sessionId The session id.
     * @returns {Promise<boolean>} A Promise of a boolean value indicating whether the clearing was successful or not.
     */
    async clearAsync(sessionId) {
        let urlParameters = this._getUrlParameters(sessionId);
        urlParameters["confirm"] = true;
        let clearSection = this.createChild(actionTypes.CLEAR);
        return await tmdbUtils.postAsync(clearSection.toString(), urlParameters);
    }

    /**
     * Deletes this list.
     * @param {string} sessionId The session id.
     * @returns {Promise<boolean>} A Promise of a boolean value indicating whether the deletion was successful or not.
     */
    async deleteAsync(sessionId) {
        return await tmdbUtils.deleteAsync(this.toString(), this._getUrlParameters(sessionId));
    }

    _getUrlParameters(sessionId) {
        return {
            "api_key": this._apiKey,
            "session_id": sessionId
        };
    }
}

/**
 * A class that represents the list section in TMDb.
 */
exports.ListSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.LIST, undefined, apiKey, language);
    }

    /**
     * Gets a List instance, based on the passed ID.
     * @param {string} id The ID of the list.
     * @returns {exports.List} A List object with the passed ID.
     */
    getList(id) {
        return new exports.List(id, this);
    }

    /**
     * Creates a new list with the passed properties.
     *
     * @param {string} name The name of the list.
     * @param {string} description The description of the list.
     * @param {string} language The language of the list.
     * @param {string} sessionId The session ID.
     *
     * @returns {Promise<exports.List>} A Promise of a List instance representing the created list
     * (null if the creation was not successful).
     */
    async createListAsync(name, description, language = "en-US", sessionId) {

        let requestBody = {
            "name": name,
            "description": description,
            "language": language
        };

        let urlParameters = {
            "api_key": this._apiKey,
            "session_id": sessionId
        };

        let response = await tmdbUtils.postAsync(this.toString(), urlParameters, requestBody);

        if (response && response["success"]) {
            return new exports.List(response["list_id"], this);
        }

        return null;
    }
}