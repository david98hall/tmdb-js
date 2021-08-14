/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');
const Section = section.Section;

/**
 * Can get and handle TV show data on TMDB.
 */
exports.TvShow = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The ID of the TV show.
     * @param {TvShowSection} tvShowSection The parent TV show section.
     */
    constructor(id, tvShowSection) {
        super(id, tvShowSection);
    }

    /**
     * Gets all details about this TV show.
     * @returns A Promise of TV show details.
     */
    getDetails() {
        return this.getQueryResult();
    }

    /**
     * Gets the account states on the TV show in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     */
    getAccountStates(sessionId = null, guestSessionId = null) {
        var childSection = new Section(dataTypes.ACCOUNT_STATES, this);
        return childSection.getQueryResult(sessionId, guestSessionId);
    }

    /**
     * Gets the alternative titles of the TV show in question.
     */
    getAlternativeTitles() {
        var childSection = new Section(dataTypes.ALTERNATIVE_TITLES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the changes of the TV show in question.
     */
    getChanges() {
        var childSection = new Section(dataTypes.CHANGES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the content ratings of the TV show in question.
     */
    getContentRatings() {
        var childSection = new Section(dataTypes.CONTENT_RATINGS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the credits of the TV show in question.
     */
    getCredits() {
        var childSection = new Section(dataTypes.CREDITS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the episode groups of the TV show in question.
     */
    getEpisodeGroups() {
        var childSection = new Section(dataTypes.EPISODE_GROUPS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the external IDs of the TV show in question.
     */
    getExternalIds() {
        var childSection = new Section(dataTypes.EXTERNAL_IDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the images of the TV show in question.
     */
    getImages() {
        var childSection = new Section(dataTypes.IMAGES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the keywords of the TV show in question.
     */
    getKeywords() {
        var childSection = new Section(dataTypes.KEYWORDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the recommendations based on the TV show in question.
     */
    getRecommendations() {
        var childSection = new Section(dataTypes.RECOMMENDATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the reviews of the TV show in question.
     */
    getReviews() {
        var childSection = new Section(dataTypes.REVIEWS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the a list of seasons or episodes of the TV show in question that were screened theatrically.
     */
    getScreenedTheatrically() {
        var childSection = new Section(dataTypes.SCREENED_THEATRICALLY, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the similar TV shows to the TV show in question.
     */
    getSimilarTvShows() {
        var childSection = new Section(dataTypes.SIMILAR_MOVIES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the translations of the TV show in question.
     */ 
    getTranslations() {
        var childSection = new Section(dataTypes.TRANSLATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the videos of the TV show in question.
     */
    getVideos() {
        var childSection = new Section(dataTypes.VIDEOS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the season with the passed number.
     * @param {Number} seasonNumber 
     */
    getSeason(seasonNumber) {
        var seasonsSection = new Section(dataTypes.CHANGES, this);
        var seasonSection = new Section(seasonNumber.toString(), seasonsSection);
        return seasonSection.getQueryResult();
    }

    /**
     * Gets all seasons.
     * @returns An array of season objects.
     */
    getSeasons() {
        var seasonNumber = 1;
        var seasons = [];
        while (true) {
            var season = this.getSeason(seasonNumber);

            if (season == undefined) {
                return seasons;
            }

            seasons.push(season)
            seasonNumber++;
        }
    }

    /**
     * Gets the specified episode of the specified season.
     * @param {*} seasonNumber The season number.
     * @param {*} episodeNumber The episode number
     */
    getEpisode(seasonNumber, episodeNumber) {
        var seasonSection = new Section(
            seasonNumber.toString(),
            new Section(dataTypes.CHANGES, this));

        var episodeSection = new Section(
            episodeNumber.toString(), 
            new Section(dataTypes.EPISODE, seasonSection));

        return episodeSection.getQueryResult();
    }

    /**
     * Gets all episodes of this TV show.
     */
    getAllEpisodes() {
        return getSeasons().filter(season => season["episodes"]).flat();
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
        super(sections.TV_SHOW, undefined, apiKey, language);
    }

    /**
     * Gets a TvShow instance, based on the passed ID.
     * @param {Number} id The TV show ID.
     * @returns A TvShow instance.
     */
    getTvShow(id) {
        return new exports.TvShow(id, this);
    }

    /**
     * Gets the latest TV shows.
     */
    getLatest() {
        var childSection = new Section(dataTypes.LATEST, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets TV shows airing today.
     */
    getTvAiringToday() {
        var childSection = new Section(dataTypes.TV_AIRING_TODAY, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets TV shows currently on the air.
     */
    getTvOnTheAir() {
        var childSection = new Section(dataTypes.TV_ON_THE_AIR, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets popular TV shows.
     */
    getPopular() {
        var childSection = new Section(dataTypes.POPULAR, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets top rated TV shows.
     */
    getTopRated() {
        var childSection = new Section(dataTypes.TOP_RATED, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the episode group with the passed ID.
     * @param {string} episodeGroupId The ID of the episode group.
     */
    getEpisodeGroup(episodeGroupId) {
        var episodeGroupSection = new Section(
            episodeGroupId,
            new Section(dataTypes.EPISODE_GROUPS, this));
        return episodeGroupSection.getQueryResult();
    }
}