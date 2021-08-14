/**@module tmdb-js */

const MovieSection = require('./sections/types/movie').MovieSection;
const ReviewSection = require('./sections/types/review').ReviewSection;
const TvShowSection = require('./sections/types/tv_show').TvShowSection;
const Searcher = require('./search/searcher').Searcher;
const Authenticator = require('./authentication/authentication').Authenticator;
const TmdbQuerier = require('./api/tmdb_querier').TmdbQuerier;

/**
 * Can handle and get TMDB data.
 */
exports.Tmdb = class extends TmdbQuerier {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The natural language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey, language);
    }

    /**
     * Gets an Authenticator instance which can 
     * be used to handle TMDB authentications.
     */
    getAuthenticator() {
        return new Authenticator(this._apiKey);
    }

    /**
     * Gets a MovieSection instance which can be used 
     * to handle and get movie data on TMDB.
     */
    getMovies() {
        return new MovieSection(this._apiKey, this._language);
    }

    /**
     * Gets a ReviewSection instance which can be used 
     * to get review data on TMDB.
     */
    getReviews() {
        return new ReviewSection(this._apiKey, this._language);
    }

    /**
     * Gets a TvShowSection instance which can be used 
     * to handle and get TV show data on TMDB.
     */
    getTvShows() {
        return new TvShowSection(this._apiKey, this._language)
    }

    /**
     * Gets a Searcher instance which can be used to search TMDB.
     */
    getSearcher() {
        return new Searcher(this._apiKey, this._language);
    }
};