const tmdb_utils = require('../../utils/tmdb_utils');
const sections = tmdb_utils.sections;
const dataTypes = tmdb_utils.dataTypes;

/**
 * A module containing functions related to TV show data on TMDB.
 * @module
 */

/**
 * Can get TV show data from the TMDB API.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The language of TMDB GET requests.
 * @param {Number} id The TV show ID. 
 */
exports.tvShow = (apiKey, language, id) => {
    var tvShow = () => {
    }

    /**
     * Gets all details about the TV show in question.
     */
    tvShow.getDetails = () => 
        tmdb_utils.getSectionDetails(sections.TV_SHOW, id, apiKey, language)

    // TODO [David Hall, 2020-06-27]: You probably need to be able to log in for this to work. Fix that first!
    /**
     * Gets the account state data for the TV show in question.
     */
    /*
    tvShow.getAccountStates = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.ACCOUNT_STATES, apiKey, language)
    */

    /**
     * Gets the alternative titles of the TV show in question.
     */
    tvShow.getAlternativeTitles = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.ALTERNATIVE_TITLES, apiKey, language)

    /**
     * Gets the changes of the TV show in question.
     */
    tvShow.getChanges = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.CHANGES, apiKey, language)

    /**
     * Gets the content ratings of the TV show in question.
     */
    tvShow.getContentRatings = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.CONTENT_RATINGS, apiKey, language)

    /**
     * Gets the credits of the TV show in question.
     */
    tvShow.getCredits = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.CREDITS, apiKey, language)

    /**
     * Gets the episode groups of the TV show in question.
     */
    tvShow.getEpisodeGroups = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.EPISODE_GROUPS, apiKey, language)

    /**
     * Gets the external IDs of the TV show in question.
     */
    tvShow.getExternalIds = () => 
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.EXTERNAL_IDS, apiKey, language)

    /**
     * Gets the images of the TV show in question.
     */
    tvShow.getImages = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.IMAGES, apiKey, language)

    /**
     * Gets the keywords of the TV show in question.
     */
    tvShow.getKeywords = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.KEYWORDS, apiKey, language)

    /**
     * Gets the recommendations based on the TV show in question.
     */
    tvShow.getRecommendations = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.RECOMMENDATIONS, apiKey, language)

    /**
     * Gets the reviews of the TV show in question.
     */
    tvShow.getReviews = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.REVIEWS, apiKey, language)

    /**
     * Gets the a list of seasons or episodes of the TV show in question that were screened theatrically.
     */
    tvShow.getScreenedTheatrically = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.SCREENED_THEATRICALLY, apiKey, language)

    /**
     * Gets the similar TV shows to the TV show in question.
     */
    tvShow.getSimilarTvShows = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.SIMILAR_TV_SHOWS, apiKey, language)

    /**
     * Gets the translations of the TV show in question.
     */ 
    tvShow.getTranslations = () => 
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.TRANSLATIONS, apiKey, language)

    /**
     * Gets the videos of the TV show in question.
     */
    tvShow.getVideos = () =>
        tmdb_utils.getSectionData(sections.TV_SHOW, id, dataTypes.VIDEOS, apiKey, language)

    return tvShow;
}

/**
 * Can get data about TV shows in general from the TMDB API.
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language The natural languages of queries.
 */
exports.tvShows = (apiKey, language) => {
    var tvShows = () => {
    };

    /**
     * Gets the latest TV shows.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // tvShows.getLatest = () => 
        // ...

    /**
     * Gets TV shows airing today.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // tvShows.getTvAiringToday = () =>
        // ...

    /**
     * Gets TV shows currently on the air.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // tvShows.getTvOnTheAir = () =>
        // ...

    /**
     * Gets popular TV shows.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // tvShows.getPopular = () =>
        // ...

    /**
     * Gets top rated TV shows.
     */
    // TODO [David Hall, 2020-06-27]: Implement a method that can get data about sections, not based on specific IDs 
    // tvShows.getTopRated = () =>
        // ...

    return tvShows;
}