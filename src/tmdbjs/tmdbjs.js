const movieSection = require('./sections/movie');
const tvShow = require('./sections/tv_show').tvShow;
const search = require('./search/search').search;
const authentication = require('./sections/authentication').authentication;
const tmdbUtils = require('../utils/tmdb_utils');
const defaultLanguage = 'en-US';

/**
 * A module containing functions for all API sections of TMDB.
 * @module
 */

/**
 * The JavaScript wrapper for The Movie Database (TMDB).
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The natural language of queries.
 */
exports.tmdb = (apiKey, language = defaultLanguage) => {
    var tmdb = () => {
    }

    /**
     * Handles authentication methods of TMDB.
     */
    tmdb.authentication = () => authentication(apiKey);
    
    /**
     * Can get movie data from the TMDB API.
     * @param {Number} id The ID of the movie.
     */
    tmdb.movie = id => movieSection.movie(apiKey, language, id);

    /**
     * Can get data about movies in general from the TMDB API.
     */
    tmdb.movies = () => movieSection.movies(apiKey, language);

    /**
     * Can get TV show data from the TMDB API.
     * @param {Number} id The ID of the TV show.
     */
    tmdb.tvShow = id => tvShow(apiKey, language, id);

    /**
     * The language of TMDB GET requests. The default value is "en-US".
     * @param {Number} startPage 
     * The page to start searching from.
     * @param {Number} pageCount 
     * The number of pages to search.
     * An object for searching for data in TMDB.
     * @param {string} language 
     * @param {Boolean} includeAdult 
     * If adult content should be included in the search results.
     */
    tmdb.search = (
        startPage = 1, 
        pageCount = 1,
        language = defaultLanguage, 
        includeAdult = true
    ) => search(apiKey, language, startPage, pageCount, includeAdult);

    return tmdb;
}