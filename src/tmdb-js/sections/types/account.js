/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;

/**
 * Can get account data from TMDB.
 */
exports.Account = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The id of the review.
     * @param {AccountSection} accountSection The parent AccountSection.
     */
    constructor(id, accountSection) {
        super(id, accountSection);
    }

    /**
     * Gets the created lists of this account
     * @returns A Promise of created lists.
     */
    getCreatedLists(sessionId, page) {
        
        var urlParameters = {
            ...this.__getBaseUrlParameters(sessionId),
            "language": this._language,
            "page": page,
        };

        return this.getChildQueryResult(dataTypes.LISTS, urlParameters);
    }

    /**
     * Gets the favorite movies of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of favorite movies.
     */
    getFavoriteMovies(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return this.__getFilteredMedia(sessionId, page, sortBy, dataTypes.MOVIES, dataTypes.FAVORITE);
    }

    /**
     * Gets the favorite TV shows of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of favorite TV shows.
     */
    getFavoriteTvShows(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return this.__getFilteredMedia(sessionId, page, sortBy, sections.TV_SHOW, dataTypes.FAVORITE);
    }
    
    
    /**
     * Gets the rated movies of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of rated movies.
     */
    getRatedMovies(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return this.__getFilteredMedia(sessionId, page, sortBy, sections.MOVIE, dataTypes.RATED);
    }
    
    /**
     * Gets the rated movies of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of rated TV shows.
     */
    getRatedTvShows(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return this.__getFilteredMedia(sessionId, page, sortBy, sections.TV_SHOW, dataTypes.RATED);
    }
    
    /**
     * Gets the rated TV show episodes of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of rated TV show episodes.
     */
    getRatedTvShowEpisodes(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {

        var urlParameters = {
            ...this.__getBaseUrlParameters(sessionId),
            "language": this._language,
            "sort_by": sortBy,
            "page": page
        };

        return this.createChild(dataTypes.RATED)
        .createChild(sections.TV_SHOW) 
        .getChildQueryResult(sections.EPISODES, urlParameters);
    }
    
    /**
     * Gets the movie watchlist of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of movies in this account's watchlist.
     */
    getMovieWatchlist(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return this.__getFilteredMedia(sessionId, page, sortBy, dataTypes.MOVIES, dataTypes.WATCHLIST);
    }
    
    /**
     * Gets the TV show watchlist of this account.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} page The page to retrieve data from.
     * @param {string} sortBy The sorting type to use (see tmdb_utils.sortingTypes).
     * 
     * @returns A Promise of TV shows in this account's watchlist.
     */
    getMovieWatchlist(sessionId, page, sortBy = tmdbUtils.sortingTypes.CREATED_AT_ASC) {
        return this.__getFilteredMedia(sessionId, page, sortBy, sections.TV_SHOW, dataTypes.WATCHLIST);
    }

    /**
     * Sets the favorite status of the movie with the specified ID.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} mediaId The ID of the movie.
     * @param {boolean} favorite A value indicating whether the movie should be set as a favorite or not.
     * 
     * @returns A Promise of a boolean value indicating whether the favorite marking was successful or not.
     */
    async setMovieFavoriteStatus(sessionId, mediaId, favorite) {
        return await this.__setFavoriteStatus(sessionId, tmdbUtils.mediaTypes.MOVIE, mediaId, favorite);
    }

    /**
     * Sets the favorite status of the TV show with the specified ID.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} mediaId The ID of the TV show.
     * @param {boolean} favorite A value indicating whether the TV show should be set as a favorite or not.
     * 
     * @returns A Promise of a boolean value indicating whether the favorite marking was successful or not.
     */
    async setTvShowFavoriteStatus(sessionId, mediaId, favorite) {
        return await this.__setFavoriteStatus(sessionId, tmdbUtils.mediaTypes.TV, mediaId, favorite);
    }

    /**
     * Sets the watchlist status of the movie with the specified ID.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} mediaId The ID of the movie.
     * @param {boolean} watchlist A value indicating whether the movie should be in the watchlist or not.
     * 
     * @returns A Promise of a boolean value indicating whether the watchlist update was successful or not.
     */
    async setMovieWatchlistStatus(sessionId, mediaId, favorite) {
        return await this.__setWatchlistStatus(sessionId, tmdbUtils.mediaTypes.MOVIE, mediaId, favorite);
    }

    /**
     * Sets the watchlist status of the TV show with the specified ID.
     * 
     * @param {string} sessionId The session ID.
     * @param {Number} mediaId The ID of the TV show.
     * @param {boolean} watchlist A value indicating whether the TV show should be in the watchlist or not.
     * 
     * @returns A Promise of a boolean value indicating whether the watchlist update was successful or not.
     */
     async setTvShowWatchlistStatus(sessionId, mediaId, favorite) {
        return await this.__setWatchlistStatus(sessionId, tmdbUtils.mediaTypes.TV, mediaId, favorite);
    }

    async __setFavoriteStatus(sessionId, mediaType, mediaId, favorite) {
        return await this.__setMediaStatus(sessionId, mediaType, mediaId, dataTypes.FAVORITE, favorite);
    }
    
    async __setWatchlistStatus(sessionId, mediaType, mediaId, watchlist) {
        return await this.__setMediaStatus(sessionId, mediaType, mediaId, dataTypes.WATCHLIST, watchlist);
    }
    
    __setMediaStatus(sessionId, mediaType, mediaId, statusType, status) {

        var urlPath = this.createChild(statusType).toString();
        
        var urlParameters = this.__getBaseUrlParameters(sessionId);
        
        var requestBody = {
            "media_type": mediaType,
            "media_id": mediaId
        };
        requestBody[statusType] = status;

        var successful = tmdbUtils.post(urlPath, urlParameters, requestBody);
        return successful;
    }

    __getFilteredMedia(sessionId, page, sortBy, mediaType, filter) {
        var urlParameters = {
            ...this.__getBaseUrlParameters(sessionId),
            "language": this._language,
            "sort_by": sortBy,
            "page": page
        };

        return this.createChild(filter)
                    .getChildQueryResult(mediaType, urlParameters);
    }

    __getBaseUrlParameters(sessionId) {
        return {
            "api_key": this._apiKey,
            "session_id": sessionId
        };
    }
}
    
/**
 * Can get account data from TMDB.
 */
exports.AccountSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.ACCOUNT, undefined, apiKey, language);
    }

    /**
     * Gets the current account details.
     * @param sessionId The sessionId.
     * @returns A Promise of account details.
     */
     getDetails(sessionId) {

        var urlParameters = {
            "api_key": this._apiKey,
            "session_id": sessionId
        };

        return this.getQueryResult(urlParameters);
    }
    
    /**
     * Gets the account with the passed id.
     * @param {Number} id The id of the review to get.
     * @return A Account instance with the passed id.
     */
    getAccount(id) {
        return new exports.Account(id, this);
    }

}