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

    async getAccountStatesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.ACCOUNT_STATES);
    }

    async getChangesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CHANGES);
    }

    async getCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CREDITS);
    }

    async getExternalIdsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.EXTERNAL_IDS);
    }

    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }

    async getVideosAsync() {
        return await this.getChildQueryResultAsync(dataTypes.VIDEOS);
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

    async getAccountStatesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.ACCOUNT_STATES);
    }

    async getAggregateCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.AGGREGATE_CREDITS);
    }

    async getChangesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CHANGES);
    }

    async getCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CREDITS);
    }

    async getExternalIdsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.EXTERNAL_IDS);
    }

    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }

    async getVideosAsync() {
        return await this.getChildQueryResultAsync(dataTypes.VIDEOS);
    }
    
    getEpisode(episodeNumber) {
        return new exports.TvShowEpisode(episodeNumber, this);
    }

    async getEpisodeCountAsync() {
        return (await this.getDetailsAsync())["episodes"].length;
    }

    async getEpisodesAsync() {
               
        // Get the number of episodes
        let numberOfEpisodes = await this.getEpisodeCountAsync();
        
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
     * Gets the account states on the TV show in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     */
    async getAccountStatesAsync(sessionId = undefined, guestSessionId = undefined) {
        let childSection = new section.Section(dataTypes.ACCOUNT_STATES, this);

        let urlParameters = { ...this._getBaseUrlParameters() };
        tmdbUtils.addSessionIdParameter(urlParameters, sessionId, guestSessionId)

        return await childSection.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the alternative titles of the TV show in question.
     */
    async getAlternativeTitlesAsync() {
        let childSection = new section.Section(dataTypes.ALTERNATIVE_TITLES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the changes of the TV show in question.
     */
    async getChangesAsync() {
        let childSection = new section.Section(dataTypes.CHANGES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the content ratings of the TV show in question.
     */
    async getContentRatingsAsync() {
        let childSection = new section.Section(dataTypes.CONTENT_RATINGS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the credits of the TV show in question.
     */
    async getCreditsAsync() {
        let childSection = new section.Section(dataTypes.CREDITS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the episode groups of the TV show in question.
     */
   async getEpisodeGroupsAsync() {
        let childSection = new section.Section(dataTypes.EPISODE_GROUPS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the external IDs of the TV show in question.
     */
    async getExternalIdsAsync() {
        let childSection = new section.Section(dataTypes.EXTERNAL_IDS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the images of the TV show in question.
     */
    async getImagesAsync() {
        let childSection = new section.Section(dataTypes.IMAGES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the keywords of the TV show in question.
     */
    async getKeywordsAsync() {
        let childSection = new section.Section(dataTypes.KEYWORDS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the recommendations based on the TV show in question.
     */
    async getRecommendationsAsync() {
        let childSection = new section.Section(dataTypes.RECOMMENDATIONS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the reviews of the TV show in question.
     */
    async getReviewsAsync() {
        let childSection = new section.Section(dataTypes.REVIEWS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the a list of seasons or episodes of the TV show in question that were screened theatrically.
     */
    async getScreenedTheatricallyAsync() {
        let childSection = new section.Section(dataTypes.SCREENED_THEATRICALLY, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the similar TV shows to the TV show in question.
     */
    async getSimilarTvShowsAsync() {
        let childSection = new section.Section(dataTypes.SIMILAR_MOVIES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the translations of the TV show in question.
     */ 
    async getTranslationsAsync() {
        let childSection = new section.Section(dataTypes.TRANSLATIONS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the videos of the TV show in question.
     */
    async getVideosAsync() {
        let childSection = new section.Section(dataTypes.VIDEOS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the season with the passed number.
     * @param {Number} seasonNumber The season number.
     * @returns A TvShowSeason object.
     */
    getSeason(seasonNumber) {
        return new exports.TvShowSeason(seasonNumber, this);
    }

    async getSeasonCountAsync() {
        return (await this.getDetailsAsync())["number_of_seasons"];
    }

    /**
     * Gets all seasons.
     * @returns An a Promise of an array of TvShowSeason objects.
     */
    async getSeasonsAsync() {
        let seasons = [];
        let seasonCount = await this.getSeasonCountAsync();
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
    async getAllEpisodesAsync() {
        let seasons = [];
        let seasonCount = await this.getSeasonCountAsync();
        for (let seasonNumber = 1; seasonNumber <= seasonCount; seasonNumber++) {
            let season = this.getSeason(seasonNumber);
            let seasonEpisodes = await season.getEpisodesAsync();
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
    async getLatestAsync() {
        let childSection = new section.Section(dataTypes.LATEST, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets TV shows airing today.
     */
    async getTvAiringTodayAsync() {
        let childSection = new section.Section(dataTypes.TV_AIRING_TODAY, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets TV shows currently on the air.
     */
    async getTvOnTheAirAsync() {
        let childSection = new section.Section(dataTypes.TV_ON_THE_AIR, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets popular TV shows.
     */
    async getPopularAsync() {
        let childSection = new section.Section(dataTypes.POPULAR, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets top rated TV shows.
     */
    async getTopRatedAsync() {
        let childSection = new section.Section(dataTypes.TOP_RATED, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the episode group with the passed ID.
     * @param {string} episodeGroupId The ID of the episode group.
     */
    async getEpisodeGroupAsync(episodeGroupId) {
        let episodeGroupSection = new section.Section(
            episodeGroupId,
            new section.Section(dataTypes.EPISODE_GROUPS, this));
        return await episodeGroupSection.getQueryResultAsync();
    }

    /**
     * Gets TV show certifications.
     */
    async getCertificationsAsync() {
        let certificationSection = new section.Section(sections.CERTIFICATION, null, this._apiKey, this._language);
        return await certificationSection.createChild(sections.TV_SHOW).getChildQueryResultAsync(sections.LIST);
    }
}