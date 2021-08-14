/**@module tmdb-js */

const Authenticator = require('./authentication/authentication').Authenticator;
const FindSection = require('./sections/types/find').FindSection;
const GenreSection = require('./sections/types/genre').GenreSection;
const KeywordSection = require('./sections/types/keyword').KeywordSection;
const MovieSection = require('./sections/types/movie').MovieSection;
const NetworkSection = require('./sections/types/network').NetworkSection;
const PeopleSection = require('./sections/types/people').PeopleSection;
const ReviewSection = require('./sections/types/review').ReviewSection;
const SearchSection = require('./sections/types/search').SearchSection;
const TmdbQuerier = require('./api/tmdb_querier').TmdbQuerier;
const TrendingSection = require('./sections/types/trending').TrendingSection;
const TvShowSection = require('./sections/types/tv_show').TvShowSection;

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
     * Gets an FindSection instance which can
     * be used to find media data based on external
     * source IDs via TMDB.
     * 
     * @param externalSource The external source (see tmdb_utils.externalSources).
     */
    getFinder(externalSource) {
        return new FindSection(externalSource, this._apiKey, this._language);
    }

    /**
     * Gets a GenreSection instance which can be used
     * to get genre data.
     */
    getGenres() {
        return new GenreSection(this._apiKey, this._language);
    }

    /**
     * Gets a KeywordSection instance which can be used
     * to get keyword data.
     */
    getKeywords() {
        return new KeywordSection(this._apiKey, this._language);
    }

    /**
     * Gets a MovieSection instance which can be used 
     * to handle and get movie data on TMDB.
     */
    getMovies() {
        return new MovieSection(this._apiKey, this._language);
    }

    /**
     * Gets a NetworkSection instance which can be used to get network data.
     */
    getNetworks() {
        return new NetworkSection(this._apiKey, this._language);
    }

    /**
     * Gets a PeopleSection instance which can be used
     * to get data about people.
     */
    getPeople() {
        return new PeopleSection(this._apiKey, this._language);
    }

    /**
     * Gets a ReviewSection instance which can be used to get review data.
     */
    getReviews() {
        return new ReviewSection(this._apiKey, this._language);
    }

    /**
     * Gets a SearchSection instance which can be used to search TMDB.
     */
    getSearcher() {
        return new SearchSection(this._apiKey, this._language);
    }

    /**
     * Gets a TrendingSection which can be used to get trending media from TMDB.
     * @param {string} timeWindow The time window (see tmdb_utils.timeWindows).
     */
    getTrending(timeWindow) {
        return new TrendingSection(timeWindow, this._apiKey, this._language);
    }

    /**
     * Gets a TvShowSection instance which can be used 
     * to handle and get TV show data on TMDB.
     */
    getTvShows() {
        return new TvShowSection(this._apiKey, this._language)
    }
};