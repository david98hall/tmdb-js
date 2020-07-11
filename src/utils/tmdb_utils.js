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
 * Gets specific data from a section in TMDB as a JSON object.
 * @function
 * @param {string} sectionType The section from where data will be retrieved
 * @param {string} sectionId The id of the section on TMDB.
 * @param {string} dataType The type of data to retrieve.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The natural language of the GET request.
 * @returns A Promise.
 */
exports.getSectionData = function(sectionType, sectionId, dataType, apiKey, language) {

    // Create the url, based on this function's parameters
    var url = baseUrlValue + sectionType + "/" + sectionId;

    // If specified, add the data type to the url. 
    // Otherwise, all section details will be retrieved
    if (dataType && dataType.length > 0) {
        url += dataType;
    }

    url += "?api_key=" + apiKey;
    url += "&language=" + language

    return httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse, httpUtils.jsonContentType);
};

/**
 * Gets general data about the section.
 * @param {string} sectionType The section type.
 * @param {string} dataType The type of data to retrieve.
 * @param {string} apiKey The TMDB API key.
 * @param {string} language The language of the retrieved data.
 */
exports.getGeneralSectionData = function(sectionType, dataType, apiKey, language) {

    // Create the url, based on this function's arguments
    var url = baseUrlValue + sectionType + "/" + dataType;
    url += "?api_key=" + apiKey;
    url += "&language=" + language

    return httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse, httpUtils.jsonContentType);
}

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
 * @param {*} apiKey The TMDB API key.
 * @param {*} sessionId The ID of the session to delete.
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
    if (sessionId && guest_session_id) {
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