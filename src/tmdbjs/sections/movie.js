const httpUtils = require('../../utils/http_utils');
const httpMethod = httpUtils.httpMethod;
const tmdb_utils = require('../../utils/tmdb_utils');
const sections = tmdb_utils.sections;
const dataTypes = tmdb_utils.dataTypes;

/**
 * A module containing functions related to movie data on TMDB.
 * @module
 */

/**
 * Can get movie data from the TMDB API.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The natural language of queries.
 * @param {Number} id The movie ID. 
 */
exports.movie = (apiKey, language, id) => {
    var movie = () => {
    }

    //#region Getters
    /**
     * Gets all details about the movie in question.
     */
    movie.getDetails = () => 
        tmdb_utils.getSectionDetails(sections.MOVIE, id, apiKey, language)

    // TODO [David Hall, 2020-06-27]: You probably need to be able to log in for this to work. Fix that first!
    /**
     * Gets the account state data for the movie in question.
     */
    /*
    movie.getAccountStates = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.ACCOUNT_STATES, apiKey, language)
    */

    /**
     * Gets the alternative titles of the movie in question.
     */
    movie.getAlternativeTitles = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.ALTERNATIVE_TITLES, apiKey, language)

    /**
     * Gets the changes of the movie in question.
     */
    movie.getChanges = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.CHANGES, apiKey, language)

    /**
     * Gets the credits of the movie in question.
     */
    movie.getCredits = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.CREDITS, apiKey, language)

    /**
     * Gets the external IDs of the movie in question.
     */
    movie.getExternalIds = () => 
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.EXTERNAL_IDS, apiKey, language)

    /**
     * Gets the images of the movie in question.
     */
    movie.getImages = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.IMAGES, apiKey, language)

    /**
     * Gets the keywords of the movie in question.
     */
    movie.getKeywords = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.KEYWORDS, apiKey, language)

    /**
     * Gets the release dates of the movie in question.
     */
    movie.getReleaseDates = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.RELEASE_DATES, apiKey, language)

    /**
     * Gets the videos of the movie in question.
     */
    movie.getVideos = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.VIDEOS, apiKey, language)

    /**
     * Gets the translations of the movie in question.
     */ 
    movie.getTranslations = () => 
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.TRANSLATIONS, apiKey, language)

    /**
     * Gets the recommendations based on the movie in question.
     */
    movie.getRecommendations = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.RECOMMENDATIONS, apiKey, language)

    /**
     * Gets the similar movies to the movie in question.
     */
    movie.getSimilarMovies = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.SIMILAR_MOVIES, apiKey, language)

    /**
     * Gets the reviews of the movie in question.
     */
    movie.getReviews = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.REVIEWS, apiKey, language)

    /**
     * Gets the lists of the movie in question.
     */
    movie.getLists = () =>
        tmdb_utils.getSectionData(sections.MOVIE, id, dataTypes.LISTS, apiKey, language)
    //#endregion

    //#region Rating functions
    const notBothSessionIdsMsg = "Can't use both a session ID and a guest session ID!";
    const noSessionIdMsg = "Can't perform action without some sort of a session ID.";

    /**
     * Rates the movie in question
     * @param {Number} rating The rating, in the range [0.5, 10].
     * @param {string} sessionId The session ID. Use this or the guest session ID.
     * @param {string} guestSessionId The guest session ID. Use this or the session ID.
     * @returns A Promise of a boolean value, which will be true if the rating was successful.
     */
    movie.rate = async (rating, sessionId = null, guestSessionId = null) => {

        if (sessionId && guestSessionId) {
            throw notBothSessionIdsMsg;
        }

        var rateUrl = tmdb_utils.baseUrl + `movie/${id}/rating?api_key=${apiKey}`;

        if (sessionId) {
            rateUrl += "&session_id=" + sessionId;
        } else if (guestSessionId) {
            rateUrl += "&guest_session_id=" + guestSessionId;
        } else {
            throw noSessionIdMsg;
        }        

        var response = await httpUtils.parseHttpRequest(
            rateUrl,
            httpMethod.POST,
            JSON.parse,
            httpUtils.jsonContentType,

            // Ensure that the rating is in the acceptable range
            JSON.stringify({ "value": Math.min(Math.max(0.5, rating), 10) }));

        return response && response.status_code == 12;
    }

    /**
     * Deletes the rating from the movie in question.
     * @param {string} sessionId The session ID. Use this or the guest session ID.
     * @param {string} guestSessionId The guest session ID. Use this or the session ID.
     * @returns A Promise of a boolean value, which will be true if the deletion was successful.
     */
    movie.deleteRating = async (sessionId = null, guestSessionId = null) => {

        if (sessionId && guestSessionId) {
            throw notBothSessionIdsMsg;
        }

        var rateUrl = tmdb_utils.baseUrl + `movie/${id}/rating?api_key=${apiKey}`;

        if (sessionId) {
            rateUrl += "&session_id=" + sessionId;
        } else if (guestSessionId) {
            rateUrl += "&guest_session_id=" + guestSessionId;
        } else {
            throw noSessionIdMsg;
        }

        var response = await httpUtils.parseHttpRequest(
            rateUrl,
            httpMethod.DELETE,
            JSON.parse,
            httpUtils.jsonContentType);

        return response && response.status_code == 13;
    }
    //#endregion

    return movie;
}

/**
 * Can get data about movies in general from the TMDB API.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The natural languages of queries.
 */
exports.movies = (apiKey, language) => {
    var movies = () => {
    }

    /**
     * Gets the latest movies.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // movies.getLatest = () => 
        // ...

    /**
     * Gets a list of movies currently playing in theatres.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // movies.getNowPlaying = () =>
        // ...

    /**
     * Gets popular movies.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // movie.getPopular = () =>
        // ...

    /**
     * Gets top rated movies.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // movie.getTopRated = () =>
        // ...

    /**
     * Gets upcoming movies.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // movie.getUpcoming = () =>
        // ...

    return movies;
}