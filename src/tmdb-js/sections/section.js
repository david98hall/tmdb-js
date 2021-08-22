/**@module tmdb-js/sections */

const TmdbQuerier = require('../api/tmdb_querier').TmdbQuerier;
const tmdbUtils = require('../../utils/tmdb_utils');

/**
 * Template class for getting and handling general section data.
 */
exports.Section = class extends TmdbQuerier {

    /**
     * The name of this section.
     */
    _name;

    /**
     * The parent of this section.
     */
    _parent;

    /**
     * Sets properties.
     * @param {string} name The name of this section.
     * @param {Section} parent The parent section of this section.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(name, parent = null, apiKey = undefined, language = "en-US") {
        super(
            parent == null ? apiKey : parent._apiKey,
            parent == null ? language : parent._language
        );
        this._name = name;
        this._parent = parent;
    }

    /**
     * Gets the section data from TMDb.
     * @param {Object} urlParameters The url parameters to use.
     * If null, the API key and language of this object will be used.
     */
    getQueryResult(urlParameters = null) {
        urlParameters = urlParameters ? urlParameters : this._getBaseUrlParameters();
        return tmdbUtils.getData(this.toString(), urlParameters);
    }

    /**
     * Returns this section in a string format.
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
     */
    getChildQueryResult(childName, urlParameters = null) {
        return this.createChild(childName).getQueryResult(urlParameters);
    }

    /**
     * Creates a new child section instance.
     * @param {string} name The name of the child section.
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