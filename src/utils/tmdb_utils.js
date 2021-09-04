/**@module utils */

const open = require('open');
const httpUtils = require('./http_utils');
const httpMethod = httpUtils.httpMethod;
const baseUrlValue = "https://api.themoviedb.org/3/";

/**
 * The TMDb API base URL.
 */
exports.baseUrl = baseUrlValue;

/**
 * Gets data as a JSON object.
 * @function
 * @param {string} urlPath The URL path from where data will be retrieved (excluding the TMDb API base URL.).
 * @param {Object} urlParameters The parameters of the URL.
 * @returns {Promise<*>} A Promise of JSON data.
 */
exports.getDataAsync = async function (urlPath, urlParameters = {}) {

    // Create the url, based on this function's parameters
    let url = exports.buildUrl(urlPath, urlParameters);
    return await httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse, httpUtils.jsonContentType);
};

/**
 * Builds the URL with the passed path and parameters.
 * @param {string} urlPath The URL path from where data will be retrieved (excluding the TMDb API base URL.).
 * @param {Object} parameters The parameters of the URL.
 */
exports.buildUrl = function (urlPath, parameters = {}) {
    let url = baseUrlValue + urlPath;

    // Apply URL parameters
    if (Object.keys(parameters).length > 0) {
        url += "?";

        for (const key in parameters) {
            if (Object.hasOwnProperty.call(parameters, key)
                && parameters[key] !== undefined
                && parameters[key] != null) {

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
 * Gets a request token from TMDb.
 * @param {string} apiKey The API key to TMDb.
 * @returns {Promise<string>} A Promise of a request token string.
 */
exports.getRequestTokenAsync = async function (apiKey) {

    // GET a request token
    let requestTokenUrl = baseUrlValue + "authentication/token/new?api_key=" + apiKey;
    let tokenRequestResult =
        await httpUtils.parseHttpRequest(requestTokenUrl, httpMethod.GET, JSON.parse);
    return tokenRequestResult["request_token"];
}

/**
 * Creates a session with login at TMDb.
 * @param {string} apiKey The API key to TMDb.
 * @param {string} username The username to use to create a session.
 * @param {string} password The password to use to create a session.
 * @returns {Promise<string>} A Promise of a session ID string (undefined if the operation is not successful).
 */
exports.createLoginSessionAsync = async function (apiKey, username, password) {

    let requestToken = await this.getRequestTokenAsync(apiKey);

    // Approve request token
    let authUrl = baseUrlValue + "authentication/token/validate_with_login?api_key=" + apiKey;
    let authResponse = await httpUtils.parseHttpRequest(
        authUrl,
        httpMethod.POST,
        JSON.parse,
        httpUtils.jsonContentType,
        JSON.stringify({
            "username": username,
            "password": password,
            "request_token": requestToken
        }));

    if (!authResponse || !authResponse["success"]) {
        // Log in and approval of request token was unsuccessful
        return undefined;
    }

    return await getSessionIdAsync(apiKey, requestToken);
}

/**
 * Creates a session at TMDb.
 * @param {string} apiKey The API key to TMDb.
 * @param {string} permissionApp
 * The name of the web browser app to use when the
 * end-user has to approve the request token.
 * @returns {Promise<string>} A Promise of a session ID string (undefined if the operation is not successful).
 */
exports.createSessionAsync = async function (apiKey, permissionApp = undefined) {

    let connectionOptions = permissionApp ? {wait: true, app: permissionApp} : {wait: true};

    // Get request token and let the user approve it
    let requestToken = await this.getRequestTokenAsync(apiKey);
    await open('https://www.themoviedb.org/authenticate/' + requestToken, connectionOptions);

    return await getSessionIdAsync(apiKey, requestToken);
}

/**
 * Gets a session ID based on the approved request token and API key.
 * @param apiKey The TMDb API key.
 * @param requestToken The approved request token.
 * @returns {Promise<string>} A Promise of a session ID string (undefined if the operation is not successful).
 */
getSessionIdAsync = async function(apiKey, requestToken) {

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
 * Creates a guest session at TMDb and returns the session ID.
 * @param {string} apiKey The TMDb API key.
 * @returns {Promise<string>} A Promise of a guest session ID.
 */
exports.createGuestSessionAsync = async (apiKey) => {
    let sessionUrl = baseUrlValue + "authentication/guest_session/new?api_key=" + apiKey;
    let sessionResponse = await httpUtils.parseHttpRequest(sessionUrl, httpMethod.GET, JSON.parse);

    if (!sessionResponse || !sessionResponse["success"]) {
        return undefined;
    }

    return sessionResponse["guest_session_id"];
}

/**
 * Deletes (log outs of) a session.
 * @param {string} apiKey The TMDb API key.
 * @param {string} sessionId The ID of the session to delete.
 * @returns {Promise<boolean>} A Promise of a boolean value,
 * which will be true if the deletion is successful.
 */
exports.deleteSessionAsync = async (apiKey, sessionId) => {
    let sessionUrl = baseUrlValue + "authentication/session?api_key=" + apiKey;
    let sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl,
        httpMethod.DELETE,
        JSON.parse,
        httpUtils.jsonContentType,
        JSON.stringify({"session_id": sessionId}));

    return sessionResponse["success"];
}

/**
 * Posts to TMDb.
 * @param {string} urlPath The URL path from where data will be posted (excluding the TMDb API base URL.).
 * @param {Object} urlParameters The parameters of the URL.
 * @param {Object} requestBody The request body object.
 * @returns {Promise<boolean>} A Promise of a boolean value, which will be true if the rating is successful.
 */
exports.postAsync = async function (urlPath, urlParameters, requestBody = null) {

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
 * @param {string} urlPath The URL path from where data will deleted (excluding the TMDb API base URL.).
 * @param {Object} urlParameters The parameters of the URL.
 * @returns {Promise<boolean>} A Promise of a boolean value, which will be true if the deletion is successful.
 */
exports.deleteAsync = async function (urlPath, urlParameters) {

    let url = exports.buildUrl(urlPath, urlParameters);

    // Wait for a response
    let response = await httpUtils.parseHttpRequest(
        url,
        httpMethod.DELETE,
        JSON.parse,
        httpUtils.jsonContentType);

    if (response && response["status_code"] === 11) {
        // TODO [david98hall, 2021-08-30]: Remove this if-statement when this API ticket is fixed: https://trello.com/c/slruAstb
        // List is deleted but the response is that there is an internal error in TMDb
        return true;
    }

    return response && response["status_code"] === 13;
};

/**
 * The different external sources supported in TMDb.
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
 * The different time window types available at TMDb.
 */
exports.timeWindows = Object.freeze({
    DAY: 'day',
    WEEK: 'week'
});

/**
 * The different media types available at TMDb.
 */
exports.mediaTypes = Object.freeze({
    ALL: 'all',
    MOVIE: 'movie',
    TV: 'tv',
    PERSON: 'person',
});

/**
 * The different types of sections available at TMDb.
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
    PROVIDERS: 'providers',
    REVIEW: 'review',
    SEARCH: 'search',
    TRENDING: 'trending',
    TV_SHOW: 'tv',
    TV_SHOW_EPISODE: 'episode',
    TV_SHOW_EPISODE_GROUP: 'episode_group',
    TV_SHOW_SEASON: 'season',
    WATCH: 'watch',
});

/**
 * The different types of data available at TMDb.
 */
exports.dataTypes = Object.freeze({
    ACCOUNT_STATES: 'account_states',
    AGGREGATE_CREDITS: 'aggregate_credits',
    AIRING_TODAY: 'airing_today',
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
    ON_THE_AIR: 'on_the_air',
    POPULAR: 'popular',
    PRIMARY_TRANSLATIONS: 'primary_translations',
    RATED: 'rated',
    RECOMMENDATIONS: 'recommendations',
    REGIONS: 'regions',
    RELEASE_DATES: 'release_dates',
    REVIEWS: 'reviews',
    SCREENED_THEATRICALLY: "screened_theatrically",
    SEASON: 'season',
    SIMILAR: 'similar',
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
 * The different types of actions available at TMDb.
 */
exports.actionTypes = Object.freeze({
    RATING: "rating",
    ADD_ITEM: "add_item",
    REMOVE_ITEM: "remove_item",
    CLEAR: "clear"
});

/**
 * The different types of sorting available at TMDb.
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