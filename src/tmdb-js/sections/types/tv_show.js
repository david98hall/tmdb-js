// HTTP utilities
const httpUtils = require('../../../utils/http_utils');
const httpMethod = httpUtils.httpMethod;

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;
const Subsection = require('../subsection').Subsection;

/**
 * Can get and handle TV show data on TMDB.
 */
exports.TvShowSubsection = class extends Subsection {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {Number} tvShowId The id of the TV show.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, tvShowId, language = "en-US") {
        super(apiKey, sections.TV_SHOW, tvShowId, language);
    }

    /**
     * Gets all details about the TV show in question.
     */
    getDetails() {
        return tmdbUtils.getSectionDetails(
            sections.TV_SHOW, this._subSectionId, this._apiKey, this._language);
    }

    // TODO [David Hall, 2020-07-05]: getAccountStates

    /**
     * Gets the alternative titles of the TV show in question.
     */
    getAlternativeTitles() {
        return this._getSectionData(dataTypes.ALTERNATIVE_TITLES);
    }

    /**
     * Gets the changes of the TV show in question.
     */
    getChanges() {
        return this._getSectionData(dataTypes.CHANGES);
    }

    /**
     * Gets the content ratings of the TV show in question.
     */
    getContentRatings() {
        return this._getSectionData(dataTypes.CONTENT_RATINGS);
    }

    /**
     * Gets the credits of the TV show in question.
     */
    getCredits() {
        return this._getSectionData(dataTypes.CREDITS);
    }

    /**
     * Gets the episode groups of the TV show in question.
     */
    getEpisodeGroups() {
        return this._getSectionData(dataTypes.EPISODE_GROUPS);
    }

    /**
     * Gets the external IDs of the TV show in question.
     */
    getExternalIds() {
        return this._getSectionData(dataTypes.EXTERNAL_IDS);
    }

    /**
     * Gets the images of the TV show in question.
     */
    getImages() {
        return this._getSectionData(dataTypes.IMAGES);
    }

    /**
     * Gets the keywords of the TV show in question.
     */
    getKeywords() {
        return this._getSectionData(dataTypes.KEYWORDS);
    }

    /**
     * Gets the recommendations based on the TV show in question.
     */
    getRecommendations() {
        return this._getSectionData(dataTypes.RECOMMENDATIONS);
    }

    /**
     * Gets the reviews of the TV show in question.
     */
    getReviews() {
        return this._getSectionData(dataTypes.REVIEWS);
    }

    /**
     * Gets the a list of seasons or episodes of the TV show in question that were screened theatrically.
     */
    getScreenedTheatrically() {
        return this._getSectionData(dataTypes.SCREENED_THEATRICALLY);
    }

    /**
     * Gets the similar TV shows to the TV show in question.
     */
    getSimilarTvShows() {
        return this._getSectionData(dataTypes.SIMILAR_TV_SHOWS);
    }

    /**
     * Gets the translations of the TV show in question.
     */ 
    getTranslations() {
        return this._getSectionData(dataTypes.TRANSLATIONS);
    }

    /**
     * Gets the videos of the TV show in question.
     */
    getVideos() {
        return this._getSectionData(dataTypes.VIDEOS);
    }
}

/**
 * Can get data about TV shows in general from the TMDB API.
 */
exports.TvShowSection = class extends Section {
    
    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey, sections.TV_SHOW, language);
    }

    /**
     * Gets a TvShowSubsection, based on the passed ID.
     * @param {Number} tvShowId The TV show ID.
     * @returns A TvShowSubsection.
     */
    getTvShow(tvShowId) {
        return new exports.TvShowSubsection(this._apiKey, tvShowId, this._language);
    }

    /**
     * Gets the latest TV shows.
     */
    // TODO [David Hall, 2020-07-05]: getLatest

    /**
     * Gets TV shows airing today.
     */
    // TODO [David Hall, 2020-07-05]: getTvAiringToday

    /**
     * Gets TV shows currently on the air.
     */
    // TODO [David Hall, 2020-07-05]: getTvOnTheAir

    /**
     * Gets popular TV shows.
     */
    // TODO [David Hall, 2020-07-05]: getPopular

    /**
     * Gets top rated TV shows.
     */
    // TODO [David Hall, 2020-07-05]: getTopRated
}