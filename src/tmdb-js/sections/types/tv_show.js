/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;

// Sections
const section = require('../section');

/**
 * A class that represents a specific TV show episode in TMDb.
 */
exports.TvShowEpisode = class extends section.RateableSection {

    /**
     * Initializes this object.
     * @param {Number} episodeNumber The episode number.
     * @param {exports.TvShowSeason} tvShowSeason The parent TV show season.
     */
    constructor(episodeNumber, tvShowSeason) {
        super(episodeNumber.toString(), new section.Section(sections.TV_SHOW_EPISODE, tvShowSeason));
    }

    /**
     * Gets details about this TV show episode.
     * @param  {...string} appendToResponse Values of the append_to_response
     * parameter used for making sub requests.
     * @returns {Promise<*>} A Promise of TV show episode details in JSON format.
     */
    async getDetailsAsync(...appendToResponse) {
        let urlParameters = appendToResponse.length > 0
            ? {"append_to_response": appendToResponse.join(",")}
            : {};
        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets account state data.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     *
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     *
     * @returns {Promise<*>} A Promise of account state data in JSON format.
     */
    async getAccountStatesAsync(sessionId = undefined, guestSessionId = undefined) {
        let urlParameters = {"session_id": sessionId, "guest_session_id": guestSessionId};
        return await this.getChildQueryResultAsync(dataTypes.ACCOUNT_STATES, urlParameters);
    }

    /**
     * Gets the changes of the TV show episode in question.
     *
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     *
     * @returns {Promise<*>} A Promise of JSON data with changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        let urlParameters = {"start_date": startDate, "end_date": endDate, "page": page};
        let id = (await this.getDetailsAsync())["id"];
        return await new exports.TvShowSection(this._apiKey, this._language)
            .createChild(dataTypes.EPISODE)
            .createChild(id)
            .getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
    }

    /**
     * Gets the credits of this TV show episode.
     * @returns {Promise<*>} A Promise of credit data in JSON format.
     */
    async getCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CREDITS);
    }

    /**
     * Gets the external IDs of this TV show episode.
     * @returns {Promise<*>} A Promise of external ID data in JSON format.
     */
    async getExternalIdsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.EXTERNAL_IDS);
    }

    /**
     * Gets the images of this TV show episode.
     * @returns {Promise<*>} A Promise of image data in JSON format.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    /**
     * Gets the translations of this TV show episode.
     * @returns {Promise<*>} A Promise of translation data in JSON format.
     */
    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }

    /**
     * Gets the videos of this TV show episode.
     * @returns {Promise<*>} A Promise of video data in JSON format.
     */
    async getVideosAsync() {
        return await this.getChildQueryResultAsync(dataTypes.VIDEOS);
    }
}

/**
 * A class that represents a specific TV show season on TMDb.
 */
exports.TvShowSeason = class extends section.Section {

    /**
     * Initializes this object.
     * @param {Number} seasonNumber The season number.
     * @param {exports.TvShow} tvShow The parent TV show.
     */
    constructor(seasonNumber, tvShow) {
        super(seasonNumber.toString(), new section.Section(sections.TV_SHOW_SEASON, tvShow));
    }

    /**
     * Gets the details of this TV show season.
     * @returns {Promise<*>} A Promise of season detail data in JSON format.
     */
    async getDetailsAsync(...appendToResponse) {
        let urlParameters = appendToResponse.length > 0
            ? {"append_to_response": appendToResponse.join(",")}
            : {};
        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets account state data.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     *
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     *
     * @returns {Promise<*>} A Promise of account state data in JSON format.
     */
    async getAccountStatesAsync(sessionId = undefined, guestSessionId = undefined) {
        let urlParameters = {"session_id": sessionId, "guest_session_id": guestSessionId};
        return await this.getChildQueryResultAsync(dataTypes.ACCOUNT_STATES, urlParameters);
    }

    /**
     * Gets aggregate credits data of this TV show season.
     * @returns {Promise<*>} A Promise of aggregate credit data in JSON format.
     */
    async getAggregateCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.AGGREGATE_CREDITS);
    }

    /**
     * Gets the changes of the TV show season in question.
     *
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     *
     * @returns {Promise<*>} A Promise of JSON data with changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        let urlParameters = {"start_date": startDate, "end_date": endDate, "page": page};
        let id = (await this.getDetailsAsync())["id"];
        return await new exports.TvShowSection(this._apiKey, this._language)
            .createChild(dataTypes.SEASON)
            .createChild(id)
            .getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
    }

    /**
     * Gets the credits of this TV show season.
     * @returns {Promise<*>} A Promise of credit data in JSON format.
     */
    async getCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.CREDITS);
    }

    /**
     * Gets the external IDs of this TV show season.
     * @returns {Promise<*>} A Promise of external ID data in JSON format.
     */
    async getExternalIdsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.EXTERNAL_IDS);
    }

    /**
     * Gets the images of this TV show season.
     * @returns {Promise<*>} A Promise of image data in JSON format.
     */
    async getImagesAsync() {
        return await this.getChildQueryResultAsync(dataTypes.IMAGES);
    }

    /**
     * Gets the translations of this TV show season.
     * @returns {Promise<*>} A Promise of translation data in JSON format.
     */
    async getTranslationsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.TRANSLATIONS);
    }

    /**
     * Gets the videos of this TV show season.
     * @returns {Promise<*>} A Promise of video data in JSON format.
     */
    async getVideosAsync() {
        return await this.getChildQueryResultAsync(dataTypes.VIDEOS);
    }

    /**
     * Gets a TvShowEpisode object with the passed episode number.
     * @param {Number} episodeNumber The episode number.
     * @returns {exports.TvShowEpisode} A TvShowEpisode object with the passed episode number.
     */
    getEpisode(episodeNumber) {
        return new exports.TvShowEpisode(episodeNumber, this);
    }

    /**
     * Gets the number of episodes in this season.
     * @returns {Promise<Number>} A Promise of an episode count.
     */
    async getEpisodeCountAsync() {
        return (await this.getDetailsAsync())["episodes"].length;
    }

    /**
     * Gets all episodes of this TV show season.
     * @returns {Promise<exports.TvShowEpisode[]>} A Promise of an array with all episodes of this season.
     */
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

exports.TvShowEpisodeGroup = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} id The id of the episode group.
     * @param {exports.TvShowSection} tvShowSection The parent TvShowSection.
     */
    constructor(id, tvShowSection) {
        super(id, tvShowSection.createChild(sections.TV_SHOW_EPISODE_GROUP));
    }

    /**
     * Gets the details about this episode group.
     * @returns {Promise<*>} A Promise of JSON data.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }
}

/**
 * A class that represents a specific TV show in TMDb.
 */
exports.TvShow = class extends section.RateableSection {

    /**
     * Initializes this object.
     * @param {string} id The ID of the TV show.
     * @param {exports.TvShowSection} tvShowSection The parent TV show section.
     */
    constructor(id, tvShowSection) {
        super(id, tvShowSection);
    }

    /**
     * Gets all details about this TV show.
     * @returns {Promise<*>} A Promise of TV show details.
     */
    async getDetailsAsync(...appendToResponse) {
        let urlParameters = appendToResponse.length > 0
            ? {"append_to_response": appendToResponse.join(",")}
            : {};
        return await this.getQueryResultAsync(urlParameters);
    }

    /**
     * Gets the account states on the TV show in question.
     * Only one of the IDs is allowed to be null or non-null in the same method call.
     * @param {string} sessionId The session ID.
     * @param {string} guestSessionId The guest session ID.
     * @returns {Promise<*>} A Promise of account state data in JSON format.
     */
    async getAccountStatesAsync(sessionId = undefined, guestSessionId = undefined) {
        let urlParameters = {"session_id": sessionId, "guest_session_id": guestSessionId};
        return await this.getChildQueryResultAsync(dataTypes.ACCOUNT_STATES, urlParameters);
    }

    /**
     * Gets aggregate credits data of this TV show.
     * @returns {Promise<*>} A Promise of aggregate credit data in JSON format.
     */
    async getAggregateCreditsAsync() {
        return await this.getChildQueryResultAsync(dataTypes.AGGREGATE_CREDITS);
    }

    /**
     * Gets the alternative titles of the TV show in question.
     * @returns {Promise<*>} A Promise of alternative title data in JSON format.
     */
    async getAlternativeTitlesAsync() {
        let childSection = new section.Section(dataTypes.ALTERNATIVE_TITLES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the changes of the TV show in question.
     *
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     *
     * @returns {Promise<*>} A Promise of JSON data with changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        let urlParameters = {"start_date": startDate, "end_date": endDate, "page": page};
        return await this.getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
    }

    /**
     * Gets the content ratings of the TV show in question.
     * @returns {Promise<*>} A Promise of content rating data in JSON format.
     */
    async getContentRatingsAsync() {
        let childSection = new section.Section(dataTypes.CONTENT_RATINGS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the credits of the TV show in question.
     * @returns {Promise<*>} A Promise of credit data in JSON format.
     */
    async getCreditsAsync() {
        let childSection = new section.Section(dataTypes.CREDITS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the episode groups of the TV show in question.
     * @returns {Promise<*>} A Promise of episode group data in JSON format.
     */
    async getEpisodeGroupDataAsync() {
        let childSection = new section.Section(dataTypes.EPISODE_GROUPS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the external IDs of the TV show in question.
     * @returns {Promise<*>} A Promise of external ID data in JSON format.
     */
    async getExternalIdsAsync() {
        let childSection = new section.Section(dataTypes.EXTERNAL_IDS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the images of the TV show in question.
     * @returns {Promise<*>} A Promise of image data in JSON format.
     */
    async getImagesAsync() {
        let childSection = new section.Section(dataTypes.IMAGES, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the keywords of the TV show in question.
     * @returns {Promise<*>} A Promise of keyword data in JSON format.
     */
    async getKeywordsAsync() {
        let childSection = new section.Section(dataTypes.KEYWORDS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the recommendations based on the TV show in question.
     * @param {Number} page The page to get data from (see the API documentation for the range)
     * @returns {Promise<*>} A Promise of recommendation data in JSON format.
     */
    async getRecommendationsAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.RECOMMENDATIONS, urlParameters);
    }

    /**
     * Gets the reviews of the TV show in question.
     * @param {Number} page The page to get data from (see the API documentation for the range)
     * @returns {Promise<*>} A Promise of reviews in JSON format.
     */
    async getReviewsAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.REVIEWS, urlParameters);
    }

    /**
     * Gets the a list of seasons or episodes of the TV show in question that were screened theatrically.
     * @returns {Promise<*>} A Promise of data about theatrically screened episodes or seasons in JSON format.
     */
    async getScreenedTheatricallyAsync() {
        let childSection = new section.Section(dataTypes.SCREENED_THEATRICALLY, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the similar TV shows to the TV show in question.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of similar TV shows in JSON format.
     */
    async getSimilarTvShowsAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.SIMILAR, urlParameters);
    }

    /**
     * Gets the translations of the TV show in question.
     * @returns {Promise<*>} A Promise of translation data in JSON format.
     */
    async getTranslationsAsync() {
        let childSection = new section.Section(dataTypes.TRANSLATIONS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the videos of the TV show in question.
     * @returns {Promise<*>} A Promise of video data in JSON format.
     */
    async getVideosAsync() {
        let childSection = new section.Section(dataTypes.VIDEOS, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets the season with the passed number.
     * @param {Number} seasonNumber The season number.
     * @returns {exports.TvShowSeason} A TvShowSeason object.
     */
    getSeason(seasonNumber) {
        return new exports.TvShowSeason(seasonNumber, this);
    }

    /**
     * Gets the number of seasons of this TV show.
     * @returns {Promise<Number>} A Promise of a season count.
     */
    async getSeasonCountAsync() {
        return (await this.getDetailsAsync())["number_of_seasons"];
    }

    /**
     * Gets all seasons.
     * @returns {Promise<exports.TvShowSeason[]>} A Promise of an array of TvShowSeason objects.
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
     * @returns {exports.TvShowEpisode} A TvShowEpisode object based on the passed season and episode numbers.
     */
    getEpisode(seasonNumber, episodeNumber) {
        return this.getSeason(seasonNumber).getEpisode(episodeNumber);
    }

    /**
     * Gets all episodes of this TV show.
     * @returns {Promise<exports.TvShowEpisode[]>} A Promise of an array containing TvShowEpisode objects.
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
 * A class that represents the TV show section in TMDb.
 */
exports.TvShowSection = class extends section.Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.TV_SHOW, undefined, apiKey, language);
    }

    /**
     * Gets a TvShow instance, based on the passed ID.
     * @param {string} id The TV show ID.
     * @returns {exports.TvShow} A TvShow object with the passed ID.
     */
    getTvShow(id) {
        return new exports.TvShow(id, this);
    }

    /**
     * Gets TV show changes.
     *
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     *
     * @returns {Promise<*>} A Promise of JSON data with TV show changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        let urlParameters = {"start_date": startDate, "end_date": endDate, "page": page};
        return await this.getChildQueryResultAsync(dataTypes.CHANGES, urlParameters);
    }

    /**
     * Gets a TvShowEpisodeGroup instance, based on the passed ID.
     * @param {string} id The ID of the episode group.
     * @returns {exports.TvShowEpisodeGroup} A TvShowEpisodeGroup object with the passed ID.
     */
    getTvShowEpisodeGroup(id) {
        return new exports.TvShowEpisodeGroup(id, this);
    }

    /**
     * Gets the latest TV shows.
     * @returns {Promise<*>} A Promise of the latest TV shows in JSON format.
     */
    async getLatestAsync() {
        let childSection = new section.Section(dataTypes.LATEST, this);
        return await childSection.getQueryResultAsync();
    }

    /**
     * Gets TV shows airing today.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of the TV shows airing today in JSON format.
     */
    async getTvAiringTodayAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.AIRING_TODAY, urlParameters);
    }

    /**
     * Gets TV shows currently on the air.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of TV shows that are on the air in JSON format.
     */
    async getTvOnTheAirAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.ON_THE_AIR, urlParameters);
    }

    /**
     * Gets popular TV shows.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of popular TV show data in JSON format.
     */
    async getPopularAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.POPULAR, urlParameters);
    }

    /**
     * Gets top rated TV shows.
     * @param {Number} page The page.
     * @returns {Promise<*>} A Promise of top rated TV show data in JSON format.
     */
    async getTopRatedAsync(page = null) {
        let urlParameters = {"page": page};
        return await this.getChildQueryResultAsync(dataTypes.TOP_RATED, urlParameters);
    }

    /**
     * Gets TV show certifications.
     * @returns {Promise<*>} A Promise of TV show certification data in JSON format.
     */
    async getCertificationsAsync() {
        let certificationSection = new section.Section(sections.CERTIFICATION, null, this._apiKey, this._language);
        return await certificationSection.createChild(sections.TV_SHOW).getChildQueryResultAsync(sections.LIST);
    }
}