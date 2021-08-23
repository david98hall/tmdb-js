/**@module tmdb-js */

const AccountSection = require('./sections/types/account').AccountSection;
const Authenticator = require('./authentication/authentication').Authenticator;
const CollectionSection = require('./sections/types/collection').CollectionSection;
const CompanySection = require('./sections/types/company').CompanySection;
const ConfigurationSection = require('./sections/types/configuration').ConfigurationSection;
const CreditSection = require('./sections/types/credit').CreditSection;
const DiscoverSection = require('./sections/types/discover').DiscoverSection;
const FindSection = require('./sections/types/find').FindSection;
const GenreSection = require('./sections/types/genre').GenreSection;
const GuestSessionSection = require('./sections/types/guest_session').GuestSessionSection;
const KeywordSection = require('./sections/types/keyword').KeywordSection;
const ListSection = require('./sections/types/list').ListSection;
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
exports.TmdbClient = class extends TmdbQuerier {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The natural language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey, language);
    }

    /**
     * Gets an AccountSection instance which can
     * be used to get and handle account data.
     */
    getAccounts() {
        return new AccountSection(this._apiKey, this._language);
    }

    /**
     * Gets an Authenticator instance which can 
     * be used to handle TMDB authentications.
     */
    getAuthenticator() {
        return new Authenticator(this._apiKey);
    }

    /**
     * Gets a CollectionSection instance which can
     * be used to get collection data.
     */
    getCollections() {
        return new CollectionSection(this._apiKey, this._language);
    }

    /**
     * Gets a CompanySection instance which can
     * be used to get company data.
     */
    getCompanies() {
        return new CompanySection(this._apiKey, this._language);
    }

    /**
     * Gets a ConfigurationSection instance which can
     * be used to get TMDB configuration data.
     */
    getConfigurations() {
        return new ConfigurationSection(this._apiKey, this._language);
    }

    /**
     * Gets a CreditSection instance which can
     * be used to get credit data.
     */
    getCredits() {
        return new CreditSection(this._apiKey, this._language);
    }

    /**
     * Gets a DiscoverSection instance which can
     * be used to discover media data on TMDB.
     */
    getDiscoverer() {
        return new DiscoverSection(this._apiKey, this._language);
    }

    /**
     * Gets a FindSection instance which can
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
     * Gets a GuestSessionSection which can be used
     * to get guest session data.
     */
    getGuestSessions() {
        return new GuestSessionSection(this._apiKey, this._language);
    }

    /**
     * Gets a KeywordSection instance which can be used
     * to get keyword data.
     */
    getKeywords() {
        return new KeywordSection(this._apiKey, this._language);
    }

    /**
     * Gets a ListSection instance which can be used
     * to get and handle list data.
     */
    getLists() {
        return new ListSection(this._apiKey, this._language);
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