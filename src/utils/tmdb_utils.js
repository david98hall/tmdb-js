/**@module utils */

const open = require('open');
const httpUtils = require('./http_utils');
const httpMethod = httpUtils.httpMethod;
const baseUrlValue = "https://api.themoviedb.org/3/";

 /**
  * The TMDB API base URL.
  */
exports.baseUrl = baseUrlValue;

/**
 * Gets data as a JSON object.
 * @function
 * @param {string} urlPath The URL from where data will be retrieved.
 * @param {Object} urlParameters The parameters of the URL.
 * @param {string} sessionId The session ID (only needed in certain cases).
 * @param {string} guestSessionId The guest session ID (only needed in certain cases).
 * @returns A Promise.
 */
exports.getData = function(urlPath, urlParameters = {}, sessionId = null, guestSessionId = null) {

    // Create the url, based on this function's parameters
    var url = baseUrlValue + urlPath;

    // Apply URL parameters
    if (Object.keys(urlParameters).length > 0) {
        url += "?";
        
        for (const key in urlParameters) {
            if (Object.hasOwnProperty.call(urlParameters, key)) {
                url += `${key}=${urlParameters[key]}&`;
            }
        }

        // Remove last parameter separator
        url = url.substr(0, url.length - 1);
    } 

    if (sessionId || guestSessionId) {
        url = exports.appendSessionId(url, sessionId, guestSessionId);
    }

    return httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse, httpUtils.jsonContentType);
};

/**
 * Gets a request token from TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @returns A Promise.
 */
exports.getRequestToken = async function(apiKey) {
    
    // GET a request token
    var requestTokenUrl = baseUrlValue + "authentication/token/new?api_key=" + apiKey;
    var tokenRequestResult = 
        await httpUtils.parseHttpRequest(requestTokenUrl, httpMethod.GET, JSON.parse);
    return tokenRequestResult.request_token;
}

/**
 * Creates a session with login at TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @param {string} username The username to use to create a session.
 * @param {string} password The password to use to create a session.
 * @returns
 * A Promise of a boolean value which is true if the login session creation was a success.
 */
exports.createLoginSession = async function(apiKey, username, password) {

    var requestToken = await this.getRequestToken(apiKey);

    // Create a session
    var sessionUrl = baseUrlValue + "authentication/token/validate_with_login?api_key=" + apiKey;
    var sessionResponse = await httpUtils.parseHttpRequest(
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
    return sessionResponse && sessionResponse.success;
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
exports.createSession = async function(apiKey, permissionApp = "chrome") {

    var requestToken = await this.getRequestToken(apiKey);

    await open('https://www.themoviedb.org/authenticate/' + requestToken, {wait: true, app: permissionApp});

    // Create a session
    var sessionUrl = baseUrlValue + "authentication/session/new?api_key=" + apiKey;
    var sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl, 
        httpMethod.POST, 
        JSON.parse, 
        httpUtils.jsonContentType,
        JSON.stringify({ "request_token": requestToken }));
    
    if (!sessionResponse || !sessionResponse.success) {
        return undefined;
    }

    // Return true if the session creation was successful
    return sessionResponse.session_id;
}

/**
 * Creates a guest session at TMDB and returns the session ID.
 * @param {string} apiKey The TMDB API key.
 * @returns A Promise of a guest session ID.
 */
exports.createGuestSession = async (apiKey) => {
    var sessionUrl = baseUrlValue + "authentication/guest_session/new?api_key=" + apiKey;
    var sessionResponse = await httpUtils.parseHttpRequest(sessionUrl, httpMethod.GET, JSON.parse);
    return sessionResponse.guest_session_id;
}

/**
 * Deletes (log outs of) a session.
 * @param {string} apiKey The TMDB API key.
 * @param {string} sessionId The ID of the session to delete.
 * @returns 
 * A Promise of a boolean value, which will be true if the deletion is successful.
 */
exports.deleteSession = async (apiKey, sessionId) => {
    var sessionUrl = baseUrlValue + "authentication/session?api_key=" + apiKey;
    var sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl,
        httpMethod.DELETE,
        JSON.parse,
        httpUtils.jsonContentType,
        JSON.stringify({ "session_id": sessionId }));

    return sessionResponse.success;
}

/**
 * Appends the non-null session ID to the base URL. 
 * Both IDs can't be null or non-null at the same time (XOR).
 * @param {string} baseUrl The base URL to append the non-null ID on.
 * @param {string} sessionId The session ID.
 * @param {string} guestSessionId The guest session ID.
 */
exports.appendSessionId = (baseUrl, sessionId = null, guestSessionId = null) => {
    if (sessionId && guestSessionId) {
        throw "A session ID and a guest session ID can't be used together."
    }
    
    if (sessionId) {
        return baseUrl + "&session_id=" + sessionId;
    }

    if (guestSessionId) {
        return baseUrl + "&guest_session_id=" + guestSessionId;
    }

    throw "Both sessionId and guestSessionId are null or undefined."
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
    CREDIT: 'credit',
    FIND: 'find',
    GENRE: 'genre',
    KEYWORD: 'keyword',
    LIST: 'list',
    MOVIE: 'movie',
    NETWORK: 'network',
    PERSON: 'person',
    REVIEW: 'review',
    SEARCH: 'search',
    TRENDING: 'trending',
    TV_SHOW: 'tv',
});

/**
 * The different types of data available at TMDB.
 */
exports.dataTypes = Object.freeze({
    ACCOUNT_STATES: 'account_states',
    ALTERNATIVE_NAMES: 'alternative_names',
    ALTERNATIVE_TITLES: 'alternative_titles',
    CHANGES: 'changes',
    COMBINED_CREDITS: 'combined_credits',
    CONTENT_RATINGS: 'content_ratings',
    CREDITS: 'credits',
    EPISODE: "episode",
    EPISODE_GROUPS: 'episode_groups',
    EXTERNAL_IDS: 'external_ids',
    IMAGES: 'images',
    KEYWORDS: 'keywords',
    LATEST: 'latest',
    LISTS: 'lists',
    MOVIE_CREDITS: 'movie_credits',
    NOW_PLAYING: 'now_playing',
    POPULAR: 'popular',
    RECOMMENDATIONS: 'recommendations',
    RELEASE_DATES: 'release_dates',
    REVIEWS: 'reviews',
    SCREENED_THEATRICALLY: "screened_theatrically",
    SEASON: 'season',
    SIMILAR_MOVIES: 'similar_movies',
    SIMILAR_TV_SHOWS: "similar_tv_shows",
    TAGGED_IMAGES: 'tagged_images',
    TOP_RATED: 'top_rated',
    TRANSLATIONS: 'translations',
    TV_AIRING_TODAY: 'tv_airing_today',
    TV_CREDITS: 'tv_credits',
    TV_ON_THE_AIR: 'tv_on_the_air',
    UPCOMING: 'upcoming',
    VIDEOS: 'videos',
});