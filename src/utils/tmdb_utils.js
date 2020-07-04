const open = require('open');
const httpUtils = require('./http_utils');
const httpMethod = httpUtils.httpMethod;
const baseUrl = "https://api.themoviedb.org/3/";

/**
 * A module containing TMDB utility functions, et cetera.
 * @module
 */

/**
 * Gets specific data from a section in TMDB as a JSON object.
 * @function
 * @param {string} sectionType The section from where data will be retrieved
 * @param {string} sectionId The id of the section on TMDB.
 * @param {string} dataType The type of data to retrieve.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The natural language of the GET request.
 * @returns A Promise.
 */
exports.getSectionData = function(sectionType, sectionId, dataType, apiKey, language = null) {

    // Create the url, based on this function's parameters
    var url = baseUrl + sectionType + "/" + sectionId;

    // If specified, add the data type to the url. 
    // Otherwise, all section details will be retrieved
    if (dataType && dataType.length > 0) {
        url += dataType;
    }

    url += "?api_key=" + apiKey;

    if (language) {
        url += "&language=" + language
    }

    return httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse);
};

/**
 * Gets all details about a section in TMDB as a JSON object.
 * @function
 * @param {string} sectionType The section from where data will be retrieved
 * @param {string} sectionId The id of the section on TMDB.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The language of TMDB GET requests.
 * @returns A Promise.
 */
exports.getSectionDetails = function(sectionType, sectionId, apiKey, language) {
    return this.getSectionData(sectionType, sectionId, null, apiKey, language);
}

/**
 * Gets a request token from TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @returns A Promise.
 */
exports.getRequestToken = async function(apiKey) {
    
    // GET a request token
    var requestTokenUrl = baseUrl + "authentication/token/new?api_key=" + apiKey;
    var tokenRequestResult = 
        await httpUtils.parseHttpRequest(requestTokenUrl, httpMethod.GET, JSON.parse);
    return tokenRequestResult.request_token;
}

/**
 * Creates a session with login at TMDB.
 * @param {string} apiKey The API key to TMDB.
 * @param {string} username The username to use to create a session.
 * @param {string} password The password to use to create a session.
 * @param {string} permissionApp 
 * The name of the web browser app to use when the 
 * end-user has to approve the request token.
 * @returns
 * A Promise of a boolean value which is true if the login session creation was a success.
 */
exports.createLoginSession = async function(apiKey, username, password, permissionApp = "chrome") {

    var requestToken = await this.getRequestToken(apiKey);

    await open('https://www.themoviedb.org/authenticate/' + requestToken, {wait: true, app: permissionApp});

    // Create a session
    var sessionUrl = baseUrl + "authentication/token/validate_with_login?api_key=" + apiKey;
    var sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl, 
        httpMethod.POST, 
        JSON.parse, 
        "application/json;charset=UTF-8",
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
    var sessionUrl = baseUrl + "authentication/session/new?api_key=" + apiKey;
    var sessionResponse = await httpUtils.parseHttpRequest(
        sessionUrl, 
        httpMethod.POST, 
        JSON.parse, 
        "application/json;charset=UTF-8",
        JSON.stringify({ "request_token": requestToken }));
    
    if (!sessionResponse || !sessionResponse.success) {
        return undefined;
    }

    // Return true if the session creation was successful
    return sessionResponse.session_id;
}

/**
 * The different types of sections available at TMDB.
 */
exports.sections = Object.freeze({
    ACCOUNT: 'account',
    COLLECTION: 'collection',
    COMPANY: 'company',
    CREDIT: 'credit',
    KEYWORD: 'keyword',
    LIST: 'list',
    MOVIE: 'movie',
    NETWORK: 'network',
    PERSON: 'person',
    REVIEW: 'review',
    TV_SHOW: 'tv',
});

/**
 * The different types of data available at TMDB.
 */
exports.dataTypes = Object.freeze({
    ACCOUNT_STATES: 'account_states',
    ALTERNATIVE_TITLES: 'alternative_titles',
    CHANGES: 'changes',
    CONTENT_RATINGS: 'content_ratings',
    CREDITS: 'credits',
    EPISODE_GROUPS: 'episode_groups',
    EXTERNAL_IDS: 'external_ids',
    IMAGES: 'images',
    KEYWORDS: 'keywords',
    LATEST: 'latest',
    LISTS: 'lists',
    NOW_PLAYING: 'now_playing',
    POPULAR: 'popular',
    RECOMMENDATIONS: 'recommendations',
    RELEASE_DATES: 'release_dates',
    REVIEWS: 'reviews',
    SCREENED_THEATRICALLY: "screened_theatrically",
    SIMILAR_MOVIES: 'similar_movies',
    SIMILAR_TV_SHOWS: "similar_tv_shows",
    TOP_RATED: 'top_rated',
    TRANSLATIONS: 'translations',
    TV_AIRING_TODAY: 'tv_airing_today',
    TV_ON_THE_AIR: 'tv_on_the_air',
    UPCOMING: 'upcoming',
    VIDEOS: 'videos',
});