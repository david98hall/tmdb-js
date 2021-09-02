/**@module tmdb-js */

const {AccountSection} = require('./sections/types/account');
const {Authenticator} = require('./authentication/authentication');
const {CollectionSection} = require('./sections/types/collection');
const {CompanySection} = require('./sections/types/company');
const {ConfigurationSection} = require('./sections/types/configuration');
const {CreditSection} = require('./sections/types/credit');
const {DiscoverSection} = require('./sections/types/discover');
const {FindSection} = require('./sections/types/find');
const {GenreSection} = require('./sections/types/genre');
const {GuestSessionSection} = require('./sections/types/guest_session');
const {KeywordSection} = require('./sections/types/keyword');
const {ListSection} = require('./sections/types/list');
const {MovieSection} = require('./sections/types/movie');
const {NetworkSection} = require('./sections/types/network');
const {PeopleSection} = require('./sections/types/people');
const {ReviewSection} = require('./sections/types/review');
const {SearchSection} = require('./sections/types/search');
const {TmdbQuerier} = require('./api/tmdb_querier');
const {TrendingSection} = require('./sections/types/trending');
const {TvShowSection} = require('./sections/types/tv_show');
const {WatchProvidersSection} = require('./sections/types/watch_provider');

/**
 * Can handle and get TMDB data.
 */
exports.TmdbClient = class extends TmdbQuerier {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The natural language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey, language);
    }

    /**
     * Gets an AccountSection instance which can
     * be used to get and handle account data.
     *
     * @returns {exports.AccountSection} An AccountSection instance.
     */
    getAccountSection() {
        return new AccountSection(this._apiKey, this._language);
    }

    /**
     * Gets an Authenticator instance which can
     * be used to handle TMDb authentications.
     *
     * @returns {exports.Authenticator} An Authenticator instance.
     */
    getAuthenticator() {
        return new Authenticator(this._apiKey);
    }

    /**
     * Gets a CollectionSection instance which can
     * be used to get collection data.
     *
     * @returns {exports.CollectionSection} A CollectionSection instance.
     */
    getCollectionSection() {
        return new CollectionSection(this._apiKey, this._language);
    }

    /**
     * Gets a CompanySection instance which can
     * be used to get company data.
     *
     * @returns {exports.CompanySection} A CompanySection instance.
     */
    getCompanySection() {
        return new CompanySection(this._apiKey, this._language);
    }

    /**
     * Gets a ConfigurationSection instance which can
     * be used to get TMDb configuration data.
     *
     * @returns {exports.ConfigurationSection} A ConfigurationSection instance.
     */
    getConfigurationSection() {
        return new ConfigurationSection(this._apiKey, this._language);
    }

    /**
     * Gets a CreditSection instance which can
     * be used to get credit data.
     *
     * @returns {exports.CreditSection} A CreditSection instance.
     */
    getCreditSection() {
        return new CreditSection(this._apiKey, this._language);
    }

    /**
     * Gets a DiscoverSection instance which can
     * be used to discover media data on TMDb.
     *
     * @returns {exports.DiscoverSection} A DiscoverSection instance.
     */
    getDiscoverSection() {
        return new DiscoverSection(this._apiKey, this._language);
    }

    /**
     * Gets a FindSection instance which can
     * be used to find media data based on external
     * source IDs via TMDb.
     *
     * @param externalSource The external source (see tmdb_utils.externalSources).
     *
     * @returns {exports.FindSection} A FindSection instance based on the passed external source.
     */
    getFindSection(externalSource) {
        return new FindSection(externalSource, this._apiKey, this._language);
    }

    /**
     * Gets a GenreSection instance which can be used
     * to get genre data.
     *
     * @returns {exports.GenreSection} A GenreSection instance.
     */
    getGenreSection() {
        return new GenreSection(this._apiKey, this._language);
    }

    /**
     * Gets a GuestSessionSection which can be used
     * to get guest session data.
     *
     * @returns {exports.GuestSessionSection} A GuestSessionSection instance.
     */
    getGuestSessionSection() {
        return new GuestSessionSection(this._apiKey, this._language);
    }

    /**
     * Gets a KeywordSection instance which can be used
     * to get keyword data.
     *
     * @returns {exports.KeywordSection} A KeywordSection instance.
     */
    getKeywordSection() {
        return new KeywordSection(this._apiKey, this._language);
    }

    /**
     * Gets a ListSection instance which can be used
     * to get and handle list data.
     *
     * @returns {exports.ListSection} A ListSection instance.
     */
    getListSection() {
        return new ListSection(this._apiKey, this._language);
    }

    /**
     * Gets a MovieSection instance which can be used
     * to handle and get movie data on TMDb.
     *
     * @returns {exports.MovieSection} A MovieSection instance.
     */
    getMovieSection() {
        return new MovieSection(this._apiKey, this._language);
    }

    /**
     * Gets a NetworkSection instance which can be used to get network data.
     *
     * @returns {exports.NetworkSection} A NetworkSection instance.
     */
    getNetworkSection() {
        return new NetworkSection(this._apiKey, this._language);
    }

    /**
     * Gets a PeopleSection instance which can be used
     * to get data about people.
     *
     * @returns {exports.PeopleSection} A PeopleSection instance.
     */
    getPeopleSection() {
        return new PeopleSection(this._apiKey, this._language);
    }

    /**
     * Gets a ReviewSection instance which can be used to get review data.
     *
     * @returns {exports.ReviewSection} A ReviewSection instance.
     */
    getReviewSection() {
        return new ReviewSection(this._apiKey, this._language);
    }

    /**
     * Gets a SearchSection instance which can be used to search TMDb.
     *
     * @returns {exports.SearchSection} A SearchSection instance.
     */
    getSearchSection() {
        return new SearchSection(this._apiKey, this._language);
    }

    /**
     * Gets a TrendingSection which can be used to get trending media from TMDb.
     * @param {string} timeWindow The time window (see tmdb_utils.timeWindows).
     *
     * @returns {exports.TrendingSection} A TrendingSection instance based on the passed time window.
     */
    getTrendingSection(timeWindow) {
        return new TrendingSection(timeWindow, this._apiKey, this._language);
    }

    /**
     * Gets a TvShowSection instance which can be used
     * to handle and get TV show data on TMDb.
     *
     * @returns {exports.TvShowSection} A TvShowSection instance.
     */
    getTvShowSection() {
        return new TvShowSection(this._apiKey, this._language)
    }

    /**
     * Gets a WatchProvidersSection instance which can be used
     * to get watch provider data from TMDb.
     *
     * @returns {exports.WatchProvidersSection} A WatchProvidersSection instance.
     */
    getWatchProvidersSection() {
        return new WatchProvidersSection(this._apiKey, this._language);
    }
};