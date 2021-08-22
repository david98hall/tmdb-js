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
     * @param {exports.Section} parent The parent section of this section.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(name, parent = undefined, apiKey = undefined, language = "en-US") {
        super(
            parent == undefined ? apiKey : parent._apiKey,
            parent == undefined ? language : parent._language
        );
        this._name = name;
        this._parent = parent;
    }

    /**
     * Gets the section data from TMDB.
     * @param {Object} urlParameters The url parameters to use.
     * If null, the API key and language of this object will be used.
     */
    getQueryResult(urlParameters = null) {
        
        if (!urlParameters) {
            urlParameters = {
                "api_key": this._apiKey,
                "language": this._language
            };
        }

        return tmdbUtils.getData(this.toString(), urlParameters);
    }

    /**
     * Returns this section in a string format.
     */
    toString() {
        var parentString = this._parent == undefined
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

}