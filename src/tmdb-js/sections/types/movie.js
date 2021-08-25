/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific movie in TMDb.
 */
exports.Movie = class extends section.RateableSection {

    /**
     * Initializes this object.
     * @param {string} id The id of the movie.
     * @param {exports.MovieSection} movieSection The parent MovieSection.
     */
    constructor(id, movieSection) {
        super(id, movieSection);
    }

    /**
     * Gets all details about this movie.
     * @returns A Promise of movie details.
     */
    async getDetailsAsync(...appendToResponse) {

        let urlParameters = null;

        if (appendToResponse.length > 0) {
            urlParameters = {
                ...this._getBaseUrlParameters(),
                "append_to_response": appendToResponse.join(",")
            }
        }

        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the account states on the movie in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * 
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     * 
     * @returns A Promise of account state JSON data.
     */
    async getAccountStatesAsync(sessionId = undefined, guestSessionId = undefined) {
        let childSection = new section.Section(dataTypes.ACCOUNT_STATES, this);

        let urlParameters = {
            ...this._getBaseUrlParameters()
        }
        tmdbUtils.addSessionIdParameter(urlParameters, sessionId, guestSessionId);

        return await childSection.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the alternative titles of the movie in question.
     * @returns A Promise of JSON data with alternative titles.
     */
    async getAlternativeTitlesAsync() {
        let childSection = new section.Section(dataTypes.ALTERNATIVE_TITLES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the changes of the movie in question.
     * @returns A Promise of JSON data with movie changes.
     */
    async getChangesAsync() {
        let childSection = new section.Section(dataTypes.CHANGES, this);
        return await childSection.getQueryResultAsync();
    }
        
    /**
     * Gets the credits of the movie in question.
     * @returns A Promise of JSON data with movie credits.
     */
    async getCreditsAsync() {
        let childSection = new section.Section(dataTypes.CREDITS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the external IDs of the movie in question.
     * @returns A Promise of JSON data with external IDs.
     */
    async getExternalIdsAsync() {
        let childSection = new section.Section(dataTypes.EXTERNAL_IDS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the images of the movie in question.
     * @returns A Promise of JSON data with movie images.
     */
    async getImagesAsync() {
        let childSection = new section.Section(dataTypes.IMAGES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the keywords of the movie in question.
     * @returns A Promise of JSON data with movie keywords.
     */
    async getKeywordsAsync() {
        let childSection = new section.Section(dataTypes.KEYWORDS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the release dates of the movie in question.
     * @returns A Promise of JSON data with movie release dates.
     */
    async getReleaseDatesAsync() {
        let childSection = new section.Section(dataTypes.RELEASE_DATES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the videos of the movie in question.
     * @returns A Promise of JSON data with movie videos.
     */
    async getVideosAsync() {
        let childSection = new section.Section(dataTypes.VIDEOS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the translations of the movie in question.
     * @returns A Promise of JSON data with movie translations.
     */
    async getTranslationsAsync() {
        let childSection = new section.Section(dataTypes.TRANSLATIONS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the recommendations based on the movie in question.
     * @returns A Promise of JSON data with recommendations.
     */
    async getRecommendationsAsync() {
        let childSection = new section.Section(dataTypes.RECOMMENDATIONS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the similar movies to the movie in question.
     * @returns A Promise of JSON data with similar movies.
     */
    async getSimilarMoviesAsync() {
        let childSection = new section.Section(dataTypes.SIMILAR_MOVIES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the reviews of the movie in question.
     * @returns A Promise of JSON data with movie reviews.
     */
    async getReviewsAsync() {
        let childSection = new section.Section(dataTypes.REVIEWS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the lists of the movie in question.
     * @returns A Promise of JSON data with lists.
     */
    async getListsAsync() {
        let childSection = new section.Section(dataTypes.LISTS, this);
        return await childSection.getQueryResultAsync();
    }
}

/**
 * A class that represents the movie section in TMDb.
 */
exports.MovieSection = class extends section.Section {
    
    /**
     * Initializes this object.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.MOVIE, undefined, apiKey, language);
    }

    /**
     * Gets a Movie instance, based on the passed ID.
     * @param {string} id The ID of the movie.
     * @returns A Movie object with the passed ID.
     */
    getMovie(id) {
        return new exports.Movie(id, this);
    }

    /**
     * Gets the latest movies.
     * @returns A Promise of JSON data with the latest movies.
     */
    async getLatestAsync() {
        let childSection = new section.Section(dataTypes.LATEST, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets a list of movies currently playing in theatres.
     * @returns A Promise of JSON data with the movies that are currently playing.
     */
    async getNowPlayingAsync() {
        let childSection = new section.Section(dataTypes.NOW_PLAYING, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets popular movies.
     * @returns A Promise of JSON data with popular movies.
     */
    async getPopularAsync() {
        let childSection = new section.Section(dataTypes.POPULAR, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets top rated movies.
     * @returns A Promise of JSON data with top rated movies.
     */
    async getTopRatedAsync() {
        let childSection = new section.Section(dataTypes.TOP_RATED, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets upcoming movies.
     * @returns A Promise of JSON data with upcoming movies.
     */
    async getUpcomingAsync() {
        let childSection = new section.Section(dataTypes.UPCOMING, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets movie certifications.
     * @returns A Promise of JSON data with movie certifications.
     */
    async getCertificationsAsync() {
        let certificationSection = new section.Section(sections.CERTIFICATION, null, this._apiKey, this._language);
        return await certificationSection.createChild(sections.MOVIE)
                                         .getChildQueryResultAsync(sections.LIST);
    }
}