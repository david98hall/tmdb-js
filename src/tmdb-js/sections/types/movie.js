/**@module tmdb-js/sections/types */

// HTTP utilities
const httpUtils = require('../../../utils/http_utils');
const httpMethod = httpUtils.httpMethod;

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');
const Section = section.Section;
const Subsection = section.Subsection;

/**
 * Can get and handle movie data on TMDB.
 */
exports.MovieSubsection = class extends Subsection {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {Number} movieId The id of the movie.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, movieId, language = "en-US") {
        super(apiKey, sections.MOVIE, movieId, language);
    }

    /**
     * Gets all details about the movie in question.
     * @returns A Promise of movie details.
     */
    getDetails() {
        return tmdbUtils.getSectionDetails(
            this._section, this._subSectionId, this._apiKey, this._language);
    }

    // TODO [David Hall, 2020-07-05]: getAccountStates

    /**
     * Gets the alternative titles of the movie in question.
     * @returns A Promise of alternative titles.
     */
    getAlternativeTitles() {
        return this._getSectionData(dataTypes.ALTERNATIVE_TITLES);
    }

    /**
     * Gets the changes of the movie in question.
     * @returns A Promise of movie changes.
     */
    getChanges() {
        return this._getSectionData(dataTypes.CHANGES);
    }
        
    /**
     * Gets the credits of the movie in question.
     * @returns A Promise of movie credits.
     */
    getCredits() {
        return this._getSectionData(dataTypes.CREDITS);
    }

    /**
     * Gets the external IDs of the movie in question.
     * @returns A Promise of external IDs.
     */
    getExternalIds() { 
        return this._getSectionData(dataTypes.EXTERNAL_IDS);
    }

    /**
     * Gets the images of the movie in question.
     * @returns A Promise of movie images.
     */
    getImages() {
        return this._getSectionData(dataTypes.IMAGES);
    }

    /**
     * Gets the keywords of the movie in question.
     * @returns A Promise of movie keywords.
     */
    getKeywords() {
        return this._getSectionData(dataTypes.KEYWORDS);
    }

    /**
     * Gets the release dates of the movie in question.
     * @returns A Promise of movie release dates.
     */
    getReleaseDates() {
        return this._getSectionData(dataTypes.RELEASE_DATES);
    }

    /**
     * Gets the videos of the movie in question.
     * @returns A Promise of movie videos.
     */
    getVideos() {
        return this._getSectionData(dataTypes.VIDEOS);
    }

    /**
     * Gets the translations of the movie in question.
     * @returns A Promise of movie translations.
     */ 
    getTranslations() {
        return this._getSectionData(dataTypes.TRANSLATIONS);
    }

    /**
     * Gets the recommendations based on the movie in question.
     * @returns A Promise of recommendations.
     */
    getRecommendations() {
        return this._getSectionData(dataTypes.RECOMMENDATIONS);
    }

    /**
     * Gets the similar movies to the movie in question.
     * @returns A Promise of similar movies.
     */
    getSimilarMovies() {
        return this._getSectionData(dataTypes.SIMILAR_MOVIES);
    }

    /**
     * Gets the reviews of the movie in question.
     * @returns A Promise of movie reviews.
     */
    getReviews() {
        return this._getSectionData(dataTypes.REVIEWS);
    }

    /**
     * Gets the lists of the movie in question.
     * @returns A Promise of lists.
     */
    getLists() {
        return this._getSectionData(dataTypes.LISTS);
    }

    #notBothSessionIdsMsg = "Can't use both a session ID and a guest session ID!";
    #noSessionIdMsg = "Can't perform action without some sort of a session ID.";

    /**
     * Rates the movie in question
     * @param {Number} rating The rating, in the range [0.5, 10].
     * @param {string} sessionId The session ID. Use this or the guest session ID.
     * @param {string} guestSessionId The guest session ID. Use this or the session ID.
     * @returns A Promise of a boolean value, which will be true if the rating was successful.
     */
    async rate(rating, sessionId = null, guestSessionId = null) {

        if (sessionId && guestSessionId) {
            throw this.#notBothSessionIdsMsg;
        }

        var rateUrl = tmdbUtils.baseUrl + `movie/${this._subSectionId}/rating?api_key=${this._apiKey}`;

        if (sessionId) {
            rateUrl += "&session_id=" + sessionId;
        } else if (guestSessionId) {
            rateUrl += "&guest_session_id=" + guestSessionId;
        } else {
            throw this.#noSessionIdMsg;
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
    async deleteRating(sessionId = null, guestSessionId = null) {

        if (sessionId && guestSessionId) {
            throw this.#notBothSessionIdsMsg;
        }

        var rateUrl = tmdbUtils.baseUrl + `movie/${this._subSectionId}/rating?api_key=${this._apiKey}`;

        if (sessionId) {
            rateUrl += "&session_id=" + sessionId;
        } else if (guestSessionId) {
            rateUrl += "&guest_session_id=" + guestSessionId;
        } else {
            throw this.#noSessionIdMsg;
        }

        var response = await httpUtils.parseHttpRequest(
            rateUrl,
            httpMethod.DELETE,
            JSON.parse,
            httpUtils.jsonContentType);

        return response && response.status_code == 13;
    }

}

/**
 * Can get data about movies in general from the TMDB API.
 */
exports.MovieSection = class extends Section {
    
    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey, sections.MOVIE, language);
    }

    /**
     * Gets a MovieSubsection, based on the passed ID.
     * @param {Number} movieId The movie ID.
     * @returns A MovieSubsection.
     */
    getMovie(movieId) {
        return new exports.MovieSubsection(this._apiKey, movieId, this._language);
    }

    /**
     * Gets the latest movies.
     */
    // TODO [David Hall, 2020-07-05] getLatest method

    /**
     * Gets a list of movies currently playing in theatres.
     */
    // TODO [David Hall, 2020-07-05] getNowPlaying method

    /**
     * Gets popular movies.
     */
    // TODO [David Hall, 2020-07-05] getPopular method

    /**
     * Gets top rated movies.
     */
    // TODO [David Hall, 2020-07-05] getTopRated method

    /**
     * Gets upcoming movies.
     */
    // TODO [David Hall, 2020-07-05] getUpcoming method
}