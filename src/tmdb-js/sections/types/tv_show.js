/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const Section = require('../section').Section;
const RateableSection = require('../rateable_section').RateableSection;

exports.TvShowEpisode = class extends RateableSection {

    /**
     * Sets properties.
     * @param {Number} id The episode number.
     * @param {TvShowSeason} tvShowSeason The parent TV show season.
     */
    constructor(id, tvShowSeason) {
        super(id.toString(), new Section(sections.TV_SHOW_EPISODE, tvShowSeason));
    }

    getDetails() {
        return this.getQueryResult();
    }

    getAccountStates() {
        return this.getChildQueryResult(dataTypes.ACCOUNT_STATES);
    }

    getChanges() {
        return this.getChildQueryResult(dataTypes.CHANGES);
    }

    getCredits() {
        return this.getChildQueryResult(dataTypes.CREDITS);
    }

    getExternalIds() {
        return this.getChildQueryResult(dataTypes.EXTERNAL_IDS);
    }

    getImages() {
        return this.getChildQueryResult(dataTypes.IMAGES);
    }

    getTranslations() {
        return this.getChildQueryResult(dataTypes.TRANSLATIONS);
    }

    getVideos() {
        return this.getChildQueryResult(dataTypes.VIDEOS);
    }

}

exports.TvShowSeason = class extends Section {

    /**
     * Sets properties.
     * @param {Number} id The season number.
     * @param {TvShow} tvShow The parent TV show.
     */
    constructor(id, tvShow) {
        super(id.toString(), new Section(sections.TV_SHOW_SEASON, tvShow));
    }

    /**
     * Gets the details of this TV show season.
     * @returns A Promise of season detail data.
     */
    getDetails() {
        return this.getQueryResult();
    }

    getAccountStates() {
        return this.getChildQueryResult(dataTypes.ACCOUNT_STATES);
    }

    getAggregateCredits() {
        return this.getChildQueryResult(dataTypes.AGGREGATE_CREDITS);
    }

    getChanges() {
        return this.getChildQueryResult(dataTypes.CHANGES);
    }

    getCredits() {
        return this.getChildQueryResult(dataTypes.CREDITS);
    }

    getExternalIds() {
        return this.getChildQueryResult(dataTypes.EXTERNAL_IDS);
    }

    getImages() {
        return this.getChildQueryResult(dataTypes.IMAGES);
    }

    getTranslations() {
        return this.getChildQueryResult(dataTypes.TRANSLATIONS);
    }

    getVideos() {
        return this.getChildQueryResult(dataTypes.VIDEOS);
    }
    
    getEpisode(episodeNumber) {
        return new exports.TvShowEpisode(episodeNumber, this);
    }

    async getEpisodeCount() {
        return (await this.getDetails()).episodes.length;
    }

    async getEpisodes() {
               
        // Get the number of episodes
        var numberOfEpisodes = await this.getEpisodeCount();
        
        var episodes = [];
        for (let i = 1; i <= numberOfEpisodes; i++) {
            episodes.push(this.getEpisode(i));
        }

        return episodes;
    }

}

/**
 * Can get and handle TV show data on TMDB.
 */
exports.TvShow = class extends RateableSection {

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
     * @param {Number} seasonNumber The season number.
     * @returns A TvShowSeason object.
     */
    getSeason(seasonNumber) {
        return new exports.TvShowSeason(seasonNumber, this);
    }

    async getSeasonCount() {
        return (await this.getDetails()).number_of_seasons;
    }

    /**
     * Gets all seasons.
     * @returns An a Promise of an array of TvShowSeason objects.
     */
    async getSeasons() {
        var seasons = [];
        var seasonCount = await this.getSeasonCount();
        for (let i = 1; i <= seasonCount; i++) {
            var season = this.getSeason(i);
            seasons.push(season)
        }

        return seasons;
    }

    /**
     * Gets the specified episode of the specified season.
     * @param {Number} seasonNumber The season number.
     * @param {Number} episodeNumber The episode number
     */
    getEpisode(seasonNumber, episodeNumber) {
        return this.getSeason(seasonNumber).getEpisode(episodeNumber);
    }

    /**
     * Gets all episodes of this TV show.
     */
    async getAllEpisodes() {
        var seasons = [];
        var seasonCount = await this.getSeasonCount();
        for (let seasonNumber = 1; seasonNumber <= seasonCount; seasonNumber++) {
            var season = this.getSeason(seasonNumber);
            var seasonEpisodes = await season.getEpisodes();
            seasons.push(seasonEpisodes);
        }

        return seasons.flat();
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

    /**
     * Gets TV show certifications.
     */
    getCertifications() {
        return new Section(sections.CERTIFICATION, null, this._apiKey, this._language)
            .createChild(sections.TV_SHOW)
            .getChildQueryResult(sections.LIST);
    }
}