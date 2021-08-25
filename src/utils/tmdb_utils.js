/**@module utils */

const open = require('open');
const httpUtils = require('./http_utils');
const httpMethod = httpUtils.httpMethod;
const baseUrlValue = "https://api.themoviedb.org/3/";
const section = require('../tmdb-js/sections/section');

 /**
  * The TMDB API base URL.
  */
exports.baseUrl = baseUrlValue;

/**
 * Gets data as a JSON object.
 * @function
 * @param {string} urlPath The URL path from where data will be retrieved (excluding the TMDB API base URL.).
 * @param {Object} urlParameters The parameters of the URL.
 * @returns A Promise of JSON data.
 */
exports.getDataAsync = async function(urlPath, urlParameters = {}) {

    // Create the url, based on this function's parameters
    let url = exports.buildUrl(urlPath, urlParameters);
    return await httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse, httpUtils.jsonContentType);
};

/**
 * Builds the URL with the passed path and parameters.
 * @param {string} urlPath The URL path from where data will be retrieved (excluding the TMDB API base URL.).
 * @param {Object} parameters The parameters of the URL.
 */
exports.buildUrl = function(urlPath, parameters = {}) {
    let url = baseUrlValue + urlPath;

    // Apply URL parameters
    if (Object.keys(parameters).length > 0) {
        url += "?";
        
        for (const key in parameters) {
            if (Object.hasOwnProperty.call(parameters, key)) {
                let uriParameter = encodeURI(parameters[key]);
                url += `${key}=${uriParameter}&`;
            }
        }

        // Remove last parameter separator
        url = url.substr(0, url.length - 1);
    } 

    return url;
};

/**
 * Gets a request token from TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @returns A Promise of a request token string.
 */
exports.getRequestTokenAsync = async function(apiKey) {
    
    // GET a request token
    let requestTokenUrl = baseUrlValue + "authentication/token/new?api_key=" + apiKey;
    let tokenRequestResult =
        await httpUtils.parseHttpRequest(requestTokenUrl, httpMethod.GET, JSON.parse);
    return tokenRequestResult["request_token"];
}

/**
 * Creates a session with login at TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @param {string} username The username to use to create a session.
 * @param {string} password The password to use to create a session.
 * @returns
 * A Promise of a boolean value which is true if the login session creation was a success.
 */
exports.createLoginSessionAsync = async function(apiKey, username, password) {

    let requestToken = await this.getRequestTokenAsync(apiKey);

    // Create a session
    let sessionUrl = baseUrlValue + "authentication/token/validate_with_login?api_key=" + apiKey;
    let sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl, 
        httpMethod.POST,
        JSON.parse, 
        httpUtils.jsonContentType,
        JSON.stringify({
            "username": username,
            "password": password,
            "request_token": requestToken
        }));

    // Return true if the session creation was successful
    return sessionResponse && sessionResponse["success"];
}

/**
 * Creates a session at TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @param {string} permissionApp 
 * The name of the web browser app to use when the 
 * end-user has to approve the request token.
 * @returns
 * A Promise of a session ID.
 */
exports.createSessionAsync = async function(apiKey, permissionApp = undefined) {

    let connectionOptions = permissionApp ? {wait: true, app: permissionApp} : {wait: true};

    // Get request token and approve it
    let requestToken = await this.getRequestTokenAsync(apiKey);
    await open('https://www.themoviedb.org/authenticate/' + requestToken, connectionOptions);

    // Create a session
    let sessionUrl = baseUrlValue + "authentication/session/new?api_key=" + apiKey + "&request_token=" + requestToken;
    let sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl, 
        httpMethod.GET, 
        JSON.parse, 
        httpUtils.jsonContentType);

    if (!sessionResponse || !sessionResponse["success"]) {
        return undefined;
    }

    // Return true if the session creation was successful
    return sessionResponse["session_id"];
}

/**
 * Creates a guest session at TMDB and returns the session ID.
 * @param {string} apiKey The TMDB API key.
 * @returns A Promise of a guest session ID.
 */
exports.createGuestSessionAsync = async (apiKey) => {
    let sessionUrl = baseUrlValue + "authentication/guest_session/new?api_key=" + apiKey;
    let sessionResponse = await httpUtils.parseHttpRequest(sessionUrl, httpMethod.GET, JSON.parse);
    return sessionResponse["guest_session_id"];
}

/**
 * Deletes (log outs of) a session.
 * @param {string} apiKey The TMDB API key.
 * @param {string} sessionId The ID of the session to delete.
 * @returns 
 * A Promise of a boolean value, which will be true if the deletion is successful.
 */
exports.deleteSessionAsync = async (apiKey, sessionId) => {
    let sessionUrl = baseUrlValue + "authentication/session?api_key=" + apiKey;
    let sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl,
        httpMethod.DELETE,
        JSON.parse,
        httpUtils.jsonContentType,
        JSON.stringify({ "session_id": sessionId }));

    return sessionResponse["success"];
}

/**
 * Adds a session id parameter (regular or guest) to the passed parameters object.
 * The sessionId and guestSessionId parameters are mutually exclusive.
 * @param {Object} parameters The object to add to.
 * @param {string} sessionId The session ID.
 * @param {string} guestSessionId The guest session ID.
 */
exports.addSessionIdParameter = (parameters, sessionId, guestSessionId = undefined) => {
    
    if (sessionId && guestSessionId) {
        throw "The sessionId and guestSessionId parameters are mutually exclusive."
    }

    if (!sessionId && !guestSessionId) {
        throw "Either sessionId or guestSessionId must be defined."
    }

    if (sessionId) {
        parameters["session_id"] = sessionId;
    } else if (guestSessionId) {
        parameters["guest_session_id"] = sessionId;
    }
}

/**
 * Posts to TMDB.
 * @param {string} urlPath The URL path from where data will be posted (excluding the TMDB API base URL.).
 * @param {Object} urlParameters The parameters of the URL.
 * @param {Object} requestBody The request body object.
 * @returns A Promise of a boolean value, which will be true if the rating is successful.
 */
exports.postAsync = async function(urlPath, urlParameters, requestBody = null) {

    let url = exports.buildUrl(urlPath, urlParameters);

    // Wait for a response
    return await httpUtils.parseHttpRequest(
        url,
        httpMethod.POST,
        JSON.parse,
        httpUtils.jsonContentType,
        requestBody ? JSON.stringify(requestBody) : null);
};

/**
 * Deletes at the passed url.
 * @param {string} urlPath The URL path from where data will deleted (excluding the TMDB API base URL.).
 * @param {Object} urlParameters The parameters of the URL.
 * @returns A Promise of a boolean value, which will be true if the deletion is successful.
 */
exports.deleteAsync = async function(urlPath, urlParameters) {
    
    let url = exports.buildUrl(urlPath, urlParameters);

    // Wait for a response
    let response = await httpUtils.parseHttpRequest(
        url,
        httpMethod.DELETE,
        JSON.parse,
        httpUtils.jsonContentType);

    return response && response["status_code"] === 13;
};

/**
 * Gets the change data related to the passed section.
 * 
 * @param {section.Section} section The section to query.
 * @param {string} startDate The start date.
 * @param {string} endDate The end date.
 * @param {Number} page The page.
 * 
 * @returns A Promise of JSON data with changes.
 */
exports.getChangesAsync = async function(section, startDate = undefined, endDate = undefined, page = null) {
    
    let urlParameters = { ...this._getBaseUrlParameters() };

    if (startDate) {
        urlParameters["start_date"] = startDate;
    }

    if (endDate) {
        urlParameters["end_date"] = endDate;
    }
    
    if (page) {
        urlParameters["page"] = page;
    }

    return await section.getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
}

/**
 * Gets data on the specified page.
 * @param {section.Section} section The section to query.
 * @param {Number} page The page.
 * @returns A Promise of JSON data obtained on the specified page.
 */
exports.getPageDataAsync = async function(section, page = null) {

    let urlParameters = { ...this._getBaseUrlParameters() };
        
    if (page) {
        urlParameters["page"] = page;
    }

    return await section.getQueryResultAsync(urlParameters);
}

/**
 * Gets data on the specified page from the passed region.
 * @param {section.Section} section The section to query.
 * @param {Number} page The page.
 * @param {string} region The region.
 * @returns A Promise of JSON data.
 */
exports.getRegionPageDataAsync = async function(section, page = null, region = undefined) {
    let urlParameters = { ...this._getBaseUrlParameters() };

    if (page) {
        urlParameters["page"] = page;
    }

    if (region) {
        urlParameters["region"] = region;
    }

    return await section.getQueryResultAsync(urlParameters);
}

/**
 * Gets data that is linked to a session.
 * @param {section.Section} section The section to query.
 * @param {string} sessionId The session ID.
 * @param {string} guestSessionId The guest session ID.
 * @returs A Promise of data in JSON format.
 */
exports.getSessionDataAsync = async function(section, sessionId, guestSessionId = undefined) {
    let urlParameters = { ...this._getBaseUrlParameters() };
    exports.addSessionIdParameter(sessionId, guestSessionId);
    return await section.getQueryResultAsync(urlParameters);
}

/**
 * The different external sources supported in TMDB.
 */
exports.externalSources = Object.freeze({
    IMDB_ID: 'imdb_id',
    FREEBASE_MID: 'freebase_mid',
    FREEBASE_ID: 'freebase_id',
    TVDB_ID: 'tvdb_id',
    TVRAGE_ID: 'tvrage_id',
    FACEBOOK_ID: 'facebook_id',
    TWITTER_ID: 'twitter_id',
    INSTAGRAM_ID: 'instagram_id'
});

/**
 * The different time window types available at TMDB.
 */
exports.timeWindows = Object.freeze({
    DAY: 'day',
    WEEK: 'week'
});

/**
 * The different media types available at TMDB.
 */
exports.mediaTypes = Object.freeze({
    ALL: 'all',
    MOVIE: 'movie',
    TV: 'tv',
    PERSON: 'person',
});

/**
 * The different types of sections available at TMDB.
 */
exports.sections = Object.freeze({
    ACCOUNT: 'account',
    CERTIFICATION: 'certification',
    COLLECTION: 'collection',
    COMPANY: 'company',
    CONFIGURATION: 'configuration',
    CREDIT: 'credit',
    DISCOVER: 'discover',
    EPISODES: 'episodes',
    FIND: 'find',
    GENRE: 'genre',
    GUEST_SESSION: 'guest_session',
    KEYWORD: 'keyword',
    LIST: 'list',
    MOVIE: 'movie',
    NETWORK: 'network',
    PERSON: 'person',
    REVIEW: 'review',
    SEARCH: 'search',
    TRENDING: 'trending',
    TV_SHOW: 'tv',
    TV_SHOW_EPISODE: 'episode',
    TV_SHOW_SEASON: 'season'
});

/**
 * The different types of data available at TMDB.
 */
exports.dataTypes = Object.freeze({
    ACCOUNT_STATES: 'account_states',
    AGGREGATE_CREDITS: 'aggregate_credits',
    ALTERNATIVE_NAMES: 'alternative_names',
    ALTERNATIVE_TITLES: 'alternative_titles',
    CHANGES: 'changes',
    COMBINED_CREDITS: 'combined_credits',
    CONTENT_RATINGS: 'content_ratings',
    COUNTRIES: 'countries',
    CREDITS: 'credits',
    EPISODE: "episode",
    EPISODE_GROUPS: 'episode_groups',
    EXTERNAL_IDS: 'external_ids',
    FAVORITE: 'favorite',
    IMAGES: 'images',
    ITEM_STATUS: 'item_status',
    JOBS: 'jobs',
    KEYWORDS: 'keywords',
    LANGUAGES: 'languages',
    LATEST: 'latest',
    LISTS: 'lists',
    MOVIES: 'movies',
    MOVIE_CREDITS: 'movie_credits',
    NOW_PLAYING: 'now_playing',
    POPULAR: 'popular',
    PRIMARY_TRANSLATIONS: 'primary_translations',
    RATED: 'rated',
    RECOMMENDATIONS: 'recommendations',
    RELEASE_DATES: 'release_dates',
    REVIEWS: 'reviews',
    SCREENED_THEATRICALLY: "screened_theatrically",
    SEASON: 'season',
    SIMILAR_MOVIES: 'similar_movies',
    SIMILAR_TV_SHOWS: "similar_tv_shows",
    TAGGED_IMAGES: 'tagged_images',
    TIMEZONES: 'timezones',
    TOP_RATED: 'top_rated',
    TRANSLATIONS: 'translations',
    TV_AIRING_TODAY: 'tv_airing_today',
    TV_CREDITS: 'tv_credits',
    TV_ON_THE_AIR: 'tv_on_the_air',
    UPCOMING: 'upcoming',
    VIDEOS: 'videos',
    WATCHLIST: 'watchlist'
});

/**
 * The different types of actions available at TMDB.
 */
exports.actionTypes = Object.freeze({
    RATING: "rating",
    ADD_ITEM: "add_item",
    REMOVE_ITEM: "remove_item",
    CLEAR: "clear"
});

/**
 * The different types of sorting available at TMDB.
 */
exports.sortingTypes = Object.freeze({
    CREATED_AT_ASC: 'created_at.asc',
    CREATED_AT_DESC: 'created_at.desc',
    VOTE_AVERAGE_ASC: 'vote_average.asc',
    VOTE_AVERAGE_DESC: 'vote_average.desc',
    FIRST_AIR_DATE_ASC: 'first_air_date.asc',
    FIRST_AIR_DATE_DESC: 'first_air_date.desc',
    POPULARITY_ASC: 'popularity.asc',
    POPULARITY_DESC: 'popularity.desc',
    VOTE_COUNT_ASC: 'vote_count.asc',
    VOTE_COUNT_DESC: 'vote_count.desc',
    ORIGINAL_TITLE_ASC: 'original_title.asc',
    ORIGINAL_TITLE_DESC: 'original_title.desc',
    RELEASE_DATE_ASC: 'release_date.asc',
    RELEASE_DATE_DESC: 'release_date.desc',
    REVENUE_ASC: 'revenue.asc',
    REVENUE_DESC: 'revenue.desc',
    PRIMARY_RELEASE_DATE_ASC: 'primary_release_date.asc',
    PRIMARY_RELEASE_DATE_DESC: 'primary_release_date.desc',
});