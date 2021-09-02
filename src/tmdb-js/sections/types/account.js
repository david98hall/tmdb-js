/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific account in TMDb.
 */
exports.Account = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the review.
     * @param {exports.AccountSection} accountSection The parent AccountSection.
     */
    constructor(id, accountSection) {
        super(id, accountSection);
    }

    /**
     * Gets the created lists of this account
     * @returns {Promise<*>} A Promise of created lists.
     */
    async getCreatedListsAsync(sessionId, page = 1) {

        let urlParameters = {
            "session_id": sessionId,
            "page": page,
        };

        return await this.getChildQueryResultAsync(dataTypes.LISTS, urlParameters);
    }

    /**
     * Gets the favorite movies of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use
     * (valid values: tmdb_utils.sortingTypes.CREATED_AT_ASC
     * and tmdb_utils.sortingTypes.CREATED_AT_DESC).
     *
     * @returns {Promise<*>} A Promise of favorite movies.
     */
    async getFavoriteMoviesAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return await this.__getFilteredMediaAsync(sessionId, page, sortBy, dataTypes.MOVIES, dataTypes.FAVORITE);
    }

    /**
     * Gets the favorite TV shows of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     *
     * @returns {Promise<*>} A Promise of favorite TV shows.
     */
    async getFavoriteTvShowsAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return await this.__getFilteredMediaAsync(sessionId, page, sortBy, sections.TV_SHOW, dataTypes.FAVORITE);
    }


    /**
     * Gets the rated movies of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     *
     * @returns {Promise<*>} A Promise of rated movies.
     */
    async getRatedMoviesAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return await this.__getFilteredMediaAsync(sessionId, page, sortBy, dataTypes.MOVIES, dataTypes.RATED);
    }

    /**
     * Gets the rated movies of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     *
     * @returns {Promise<*>} A Promise of rated TV shows.
     */
    async getRatedTvShowsAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return await this.__getFilteredMediaAsync(sessionId, page, sortBy, sections.TV_SHOW, dataTypes.RATED);
    }

    /**
     * Gets the rated TV show episodes of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     *
     * @returns {Promise<*>} A Promise of rated TV show episodes.
     */
    async getRatedTvShowEpisodesAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {

        let urlParameters = {
            "session_id": sessionId,
            "sort_by": sortBy,
            "page": page
        };

        return await this.createChild(dataTypes.RATED)
            .createChild(sections.TV_SHOW)
            .getChildQueryResultAsync(sections.EPISODES, urlParameters);
    }

    /**
     * Gets the movie watchlist of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     *
     * @returns {Promise<*>} A Promise of movies in this account's watchlist.
     */
    async getMovieWatchlistAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return await this.__getFilteredMediaAsync(sessionId, page, sortBy, dataTypes.MOVIES, dataTypes.WATCHLIST);
    }

    /**
     * Gets the TV show watchlist of this account.
     *
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     *
     * @returns {Promise<*>} A Promise of TV shows in this account's watchlist.
     */
    async getTvShowWatchlistAsync(sessionId, page = 1, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return await this.__getFilteredMediaAsync(sessionId, page, sortBy, sections.TV_SHOW, dataTypes.WATCHLIST);
    }

    /**
     * Sets the favorite status of the movie with the specified ID.
     *
     * @param {string} sessionId The session ID.
     * @param {string} mediaId The ID of the movie.
     * @param {boolean} favorite A value indicating whether the movie should be set as a favorite or not.
     *
     * @returns {Promise<boolean>} A Promise of a boolean value indicating whether the favorite marking was successful or not.
     */
    async setMovieFavoriteStatusAsync(sessionId, mediaId, favorite) {
        return await this.__setFavoriteStatusAsync(sessionId, tmdbUtils.mediaTypes.MOVIE, mediaId, favorite);
    }

    /**
     * Sets the favorite status of the TV show with the specified ID.
     *
     * @param {string} sessionId The session ID.
     * @param {string} mediaId The ID of the TV show.
     * @param {boolean} favorite A value indicating whether the TV show should be set as a favorite or not.
     *
     * @returns {Promise<boolean>} A Promise of a boolean value indicating whether the favorite marking was successful or not.
     */
    async setTvShowFavoriteStatusAsync(sessionId, mediaId, favorite) {
        return await this.__setFavoriteStatusAsync(sessionId, tmdbUtils.mediaTypes.TV, mediaId, favorite);
    }

    /**
     * Sets the watchlist status of the movie with the specified ID.
     *
     * @param {string} sessionId The session ID.
     * @param {string} mediaId The ID of the movie.
     * @param {boolean} watchlist A value indicating whether the movie should be in the watchlist or not.
     *
     * @returns {Promise<boolean>}  A Promise of a boolean value indicating whether the watchlist update was successful or not.
     */
    async setMovieWatchlistStatusAsync(sessionId, mediaId, watchlist) {
        return await this.__setWatchlistStatusAsync(sessionId, tmdbUtils.mediaTypes.MOVIE, mediaId, watchlist);
    }

    /**
     * Sets the watchlist status of the TV show with the specified ID.
     *
     * @param {string} sessionId The session ID.
     * @param {string} mediaId The ID of the TV show.
     * @param {boolean} watchlist A value indicating whether the TV show should be in the watchlist or not.
     *
     * @returns {Promise<boolean>}  A Promise of a boolean value indicating whether the watchlist update was successful or not.
     */
    async setTvShowWatchlistStatusAsync(sessionId, mediaId, watchlist) {
        return await this.__setWatchlistStatusAsync(sessionId, tmdbUtils.mediaTypes.TV, mediaId, watchlist);
    }

    async __setFavoriteStatusAsync(sessionId, mediaType, mediaId, favorite) {
        return await this.__setMediaStatusAsync(sessionId, mediaType, mediaId, dataTypes.FAVORITE, favorite);
    }

    async __setWatchlistStatusAsync(sessionId, mediaType, mediaId, watchlist) {
        return await this.__setMediaStatusAsync(sessionId, mediaType, mediaId, dataTypes.WATCHLIST, watchlist);
    }

    async __setMediaStatusAsync(sessionId, mediaType, mediaId, statusType, status) {

        let urlPath = this.createChild(statusType).toString();

        let urlParameters = {
            "api_key": this._apiKey,
            "session_id": sessionId
        }

        let requestBody = {
            "media_type": mediaType,
            "media_id": mediaId
        };
        requestBody[statusType] = status;

        return await tmdbUtils.postAsync(urlPath, urlParameters, requestBody);
    }

    async __getFilteredMediaAsync(sessionId, page, sortBy, mediaType, filter) {
        let urlParameters = {
            "session_id": sessionId,
            "sort_by": sortBy,
            "page": page
        };

        return await this.createChild(filter)
            .getChildQueryResultAsync(mediaType, urlParameters);
    }
}

/**
 * A class that represents the account section in TMDb.
 */
exports.AccountSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.ACCOUNT, undefined, apiKey, language);
    }

    /**
     * Gets the current account details.
     * @param sessionId The sessionId.
     * @returns {Promise<*>} A Promise of account details.
     */
    async getDetailsAsync(sessionId) {
        let urlParameters = {"session_id": sessionId};
        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the account with the passed id.
     * @param {string} id The id of the review to get.
     * @returns {exports.Account} A Account instance with the passed id.
     */
    getAccount(id) {
        return new exports.Account(id, this);
    }
}