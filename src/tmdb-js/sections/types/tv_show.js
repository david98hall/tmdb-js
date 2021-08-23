/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

exports.TvShowEpisode = class extends section.RateableSection {

    /**
     * Sets properties.
     * @param {Number} episodeNumber The episode number.
     * @param {exports.TvShowSeason} tvShowSeason The parent TV show season.
     */
    constructor(episodeNumber, tvShowSeason) {
        super(episodeNumber.toString(), new section.Section(sections.TV_SHOW_EPISODE, tvShowSeason));
    }

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

exports.TvShowSeason = class extends section.Section {

    /**
     * Sets properties.
     * @param {Number} seasonNumber The season number.
     * @param {exports.TvShow} tvShow The parent TV show.
     */
    constructor(seasonNumber, tvShow) {
        super(seasonNumber.toString(), new section.Section(sections.TV_SHOW_SEASON, tvShow));
    }

    /**
     * Gets the details of this TV show season.
     * @returns A Promise of season detail data.
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
        return (await this.getDetails())["episodes"].length;
    }

    async getEpisodes() {
               
        // Get the number of episodes
        let numberOfEpisodes = await this.getEpisodeCount();
        
        let episodes = [];
        for (let i = 1; i <= numberOfEpisodes; i++) {
            episodes.push(this.getEpisode(i));
        }

        return episodes;
    }

}

/**
 * Can get and handle TV show data on TMDB.
 */
exports.TvShow = class extends section.RateableSection {

    /**
     * Sets properties.
     * @param {string} id The ID of the TV show.
     * @param {exports.TvShowSection} tvShowSection The parent TV show section.
     */
    constructor(id, tvShowSection) {
        super(id, tvShowSection);
    }

    /**
     * Gets all details about this TV show.
     * @returns A Promise of TV show details.
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
     * Gets the account states on the TV show in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     */
    getAccountStates(sessionId = undefined, guestSessionId = undefined) {
        let childSection = new section.Section(dataTypes.ACCOUNT_STATES, this);

        let urlParameters = { ...this._getBaseUrlParameters() };
        tmdbUtils.addSessionIdParameter(urlParameters, sessionId, guestSessionId)

        return childSection.getQueryResult(urlParameters);
    }

    /**
     * Gets the alternative titles of the TV show in question.
     */
    getAlternativeTitles() {
        let childSection = new section.Section(dataTypes.ALTERNATIVE_TITLES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the changes of the TV show in question.
     */
    getChanges() {
        let childSection = new section.Section(dataTypes.CHANGES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the content ratings of the TV show in question.
     */
    getContentRatings() {
        let childSection = new section.Section(dataTypes.CONTENT_RATINGS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the credits of the TV show in question.
     */
    getCredits() {
        let childSection = new section.Section(dataTypes.CREDITS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the episode groups of the TV show in question.
     */
    getEpisodeGroups() {
        let childSection = new section.Section(dataTypes.EPISODE_GROUPS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the external IDs of the TV show in question.
     */
    getExternalIds() {
        let childSection = new section.Section(dataTypes.EXTERNAL_IDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the images of the TV show in question.
     */
    getImages() {
        let childSection = new section.Section(dataTypes.IMAGES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the keywords of the TV show in question.
     */
    getKeywords() {
        let childSection = new section.Section(dataTypes.KEYWORDS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the recommendations based on the TV show in question.
     */
    getRecommendations() {
        let childSection = new section.Section(dataTypes.RECOMMENDATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the reviews of the TV show in question.
     */
    getReviews() {
        let childSection = new section.Section(dataTypes.REVIEWS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the a list of seasons or episodes of the TV show in question that were screened theatrically.
     */
    getScreenedTheatrically() {
        let childSection = new section.Section(dataTypes.SCREENED_THEATRICALLY, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the similar TV shows to the TV show in question.
     */
    getSimilarTvShows() {
        let childSection = new section.Section(dataTypes.SIMILAR_MOVIES, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the translations of the TV show in question.
     */ 
    getTranslations() {
        let childSection = new section.Section(dataTypes.TRANSLATIONS, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the videos of the TV show in question.
     */
    getVideos() {
        let childSection = new section.Section(dataTypes.VIDEOS, this);
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
        return (await this.getDetails())["number_of_seasons"];
    }

    /**
     * Gets all seasons.
     * @returns An a Promise of an array of TvShowSeason objects.
     */
    async getSeasons() {
        let seasons = [];
        let seasonCount = await this.getSeasonCount();
        for (let i = 1; i <= seasonCount; i++) {
            let season = this.getSeason(i);
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
        let seasons = [];
        let seasonCount = await this.getSeasonCount();
        for (let seasonNumber = 1; seasonNumber <= seasonCount; seasonNumber++) {
            let season = this.getSeason(seasonNumber);
            let seasonEpisodes = await season.getEpisodes();
            seasons.push(seasonEpisodes);
        }

        return seasons.flat();
    }
}

/**
 * Can get data about TV shows in general from the TMDB API.
 */
exports.TvShowSection = class extends section.Section {
    
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
     * @param {string} id The TV show ID.
     * @returns A TvShow instance.
     */
    getTvShow(id) {
        return new exports.TvShow(id, this);
    }

    /**
     * Gets the latest TV shows.
     */
    getLatest() {
        let childSection = new section.Section(dataTypes.LATEST, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets TV shows airing today.
     */
    getTvAiringToday() {
        let childSection = new section.Section(dataTypes.TV_AIRING_TODAY, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets TV shows currently on the air.
     */
    getTvOnTheAir() {
        let childSection = new section.Section(dataTypes.TV_ON_THE_AIR, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets popular TV shows.
     */
    getPopular() {
        let childSection = new section.Section(dataTypes.POPULAR, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets top rated TV shows.
     */
    getTopRated() {
        let childSection = new section.Section(dataTypes.TOP_RATED, this);
        return childSection.getQueryResult();
    }

    /**
     * Gets the episode group with the passed ID.
     * @param {string} episodeGroupId The ID of the episode group.
     */
    getEpisodeGroup(episodeGroupId) {
        let episodeGroupSection = new section.Section(
            episodeGroupId,
            new section.Section(dataTypes.EPISODE_GROUPS, this));
        return episodeGroupSection.getQueryResult();
    }

    /**
     * Gets TV show certifications.
     */
    getCertifications() {
        return new section.Section(sections.CERTIFICATION, null, this._apiKey, this._language)
            .createChild(sections.TV_SHOW)
            .getChildQueryResult(sections.LIST);
    }
}