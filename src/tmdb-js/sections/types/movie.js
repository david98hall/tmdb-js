/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * Can get and handle movie data on TMDB.
 */
exports.Movie = class extends section.RateableSection {

    /**
     * Sets properties.
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
    getDetails(...appendToResponse) {

        let urlParameters = null;

        if (appendToResponse.length > 0) {
            urlParameters = {
                ...this._getBaseUrlParameters(),
                "append_to_response": appendToResponse.join(",")
            }
        }

        return this.getQueryResult(urlParameters);
    }

    /**
     * Gets the account states on the movie in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     */
    getAccountStates(sessionId = undefined, guestSessionId = undefined) {
        let childSection = new Section(dataTypes.ACCOUNT_STATES, this);

        let urlParameters = {
            ...this._getBaseUrlParameters()
        }
        tmdbUtils.addSessionIdParameter(urlParameters, sessionId, guestSessionId);

        return childSection.getQueryResult(urlParameters);
    }

    /**
     * Gets the alternative titles of the movie in question.
     * @returns A Promise of alternative titles.
     */
    getAlternativeTitles() {
        let childSection = new Section(dataTypes.ALTERNATIVE_TITLES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the changes of the movie in question.
     * @returns A Promise of movie changes.
     */
    getChanges() {
        let childSection = new Section(dataTypes.CHANGES, this);
        return childSection.getQueryResult();
    }
        
    /**
     * Gets the credits of the movie in question.
     * @returns A Promise of movie credits.
     */
    getCredits() {
        let childSection = new Section(dataTypes.CREDITS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the external IDs of the movie in question.
     * @returns A Promise of external IDs.
     */
    getExternalIds() { 
        let childSection = new Section(dataTypes.EXTERNAL_IDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the images of the movie in question.
     * @returns A Promise of movie images.
     */
    getImages() {
        let childSection = new Section(dataTypes.IMAGES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the keywords of the movie in question.
     * @returns A Promise of movie keywords.
     */
    getKeywords() {
        let childSection = new Section(dataTypes.KEYWORDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the release dates of the movie in question.
     * @returns A Promise of movie release dates.
     */
    getReleaseDates() {
        let childSection = new Section(dataTypes.RELEASE_DATES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the videos of the movie in question.
     * @returns A Promise of movie videos.
     */
    getVideos() {
        let childSection = new Section(dataTypes.VIDEOS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the translations of the movie in question.
     * @returns A Promise of movie translations.
     */
    getTranslations() {
        let childSection = new Section(dataTypes.TRANSLATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the recommendations based on the movie in question.
     * @returns A Promise of recommendations.
     */
    getRecommendations() {
        let childSection = new Section(dataTypes.RECOMMENDATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the similar movies to the movie in question.
     * @returns A Promise of similar movies.
     */
    getSimilarMovies() {
        let childSection = new Section(dataTypes.SIMILAR_MOVIES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the reviews of the movie in question.
     * @returns A Promise of movie reviews.
     */
    getReviews() {
        let childSection = new Section(dataTypes.REVIEWS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the lists of the movie in question.
     * @returns A Promise of lists.
     */
    getLists() {
        let childSection = new Section(dataTypes.LISTS, this);
        return childSection.getQueryResult();
    }
}

/**
 * Can get data about movies in general from the TMDB API.
 */
exports.MovieSection = class extends section.Section {
    
    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.MOVIE, undefined, apiKey, language);
    }

    /**
     * Gets a Movie instance, based on the passed ID.
     * @param {string} id The ID of the movie.
     * @returns A Movie instance.
     */
    getMovie(id) {
        return new exports.Movie(id, this);
    }

    /**
     * Gets the latest movies.
     */
    getLatest() {
        let childSection = new Section(dataTypes.LATEST, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets a list of movies currently playing in theatres.
     */
    getNowPlaying() {
        let childSection = new Section(dataTypes.NOW_PLAYING, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets popular movies.
     */
    getPopular() {
        let childSection = new Section(dataTypes.POPULAR, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets top rated movies.
     */
    getTopRated() {
        let childSection = new Section(dataTypes.TOP_RATED, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets upcoming movies.
     */
    getUpcoming() {
        let childSection = new Section(dataTypes.UPCOMING, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets movie certifications.
     */
    getCertifications() {
        return new Section(sections.CERTIFICATION, null, this._apiKey, this._language)
            .createChild(sections.MOVIE)
            .getChildQueryResult(sections.LIST);
    }
}