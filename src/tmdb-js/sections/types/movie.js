/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;
const actionTypes = tmdbUtils.actionTypes;

// Sections
const Section = require('../section').Section;
const RateableSection = require('../rateable_section').RateableSection;

/**
 * Can get and handle movie data on TMDB.
 */
exports.Movie = class extends RateableSection {

    /**
     * Sets properties.
     * @param {Number} id The id of the movie.
     * @param {MovieSection} movieSection The parent MovieSection.
     */
    constructor(id, movieSection) {
        super(id, movieSection);
    }

    /**
     * Gets all details about this movie.
     * @returns A Promise of movie details.
     */
    getDetails() {
        return this.getQueryResult();
    }

    /**
     * Gets the account states on the movie in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     */
    getAccountStates(sessionId = null, guestSessionId = null) {
        var childSection = new Section(dataTypes.ACCOUNT_STATES, this);
        return childSection.getQueryResult(sessionId, guestSessionId);
    }

    /**
     * Gets the alternative titles of the movie in question.
     * @returns A Promise of alternative titles.
     */
    getAlternativeTitles() {
        var childSection = new Section(dataTypes.ALTERNATIVE_TITLES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the changes of the movie in question.
     * @returns A Promise of movie changes.
     */
    getChanges() {
        var childSection = new Section(dataTypes.CHANGES, this);
        return childSection.getQueryResult();
    }
        
    /**
     * Gets the credits of the movie in question.
     * @returns A Promise of movie credits.
     */
    getCredits() {
        var childSection = new Section(dataTypes.CREDITS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the external IDs of the movie in question.
     * @returns A Promise of external IDs.
     */
    getExternalIds() { 
        var childSection = new Section(dataTypes.EXTERNAL_IDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the images of the movie in question.
     * @returns A Promise of movie images.
     */
    getImages() {
        var childSection = new Section(dataTypes.IMAGES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the keywords of the movie in question.
     * @returns A Promise of movie keywords.
     */
    getKeywords() {
        var childSection = new Section(dataTypes.KEYWORDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the release dates of the movie in question.
     * @returns A Promise of movie release dates.
     */
    getReleaseDates() {
        var childSection = new Section(dataTypes.RELEASE_DATES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the videos of the movie in question.
     * @returns A Promise of movie videos.
     */
    getVideos() {
        var childSection = new Section(dataTypes.VIDEOS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the translations of the movie in question.
     * @returns A Promise of movie translations.
     */ 
    getTranslations() {
        var childSection = new Section(dataTypes.TRANSLATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the recommendations based on the movie in question.
     * @returns A Promise of recommendations.
     */
    getRecommendations() {
        var childSection = new Section(dataTypes.RECOMMENDATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the similar movies to the movie in question.
     * @returns A Promise of similar movies.
     */
    getSimilarMovies() {
        var childSection = new Section(dataTypes.SIMILAR_MOVIES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the reviews of the movie in question.
     * @returns A Promise of movie reviews.
     */
    getReviews() {
        var childSection = new Section(dataTypes.REVIEWS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the lists of the movie in question.
     * @returns A Promise of lists.
     */
    getLists() {
        var childSection = new Section(dataTypes.LISTS, this);
        return childSection.getQueryResult();
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
        super(sections.MOVIE, undefined, apiKey, language);
    }

    /**
     * Gets a Movie instance, based on the passed ID.
     * @param {Number} id The ID of the movie.
     * @returns A Movie instance.
     */
    getMovie(id) {
        return new exports.Movie(id, this);
    }

    /**
     * Gets the latest movies.
     */
    getLatest() {
        var childSection = new Section(dataTypes.LATEST, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets a list of movies currently playing in theatres.
     */
    getNowPlaying() {
        var childSection = new Section(dataTypes.NOW_PLAYING, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets popular movies.
     */
    getPopular() {
        var childSection = new Section(dataTypes.POPULAR, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets top rated movies.
     */
    getTopRated() {
        var childSection = new Section(dataTypes.TOP_RATED, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets upcoming movies.
     */
    getUpcoming() {
        var childSection = new Section(dataTypes.UPCOMING, this);
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