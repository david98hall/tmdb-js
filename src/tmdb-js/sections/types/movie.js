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
     * @param {string} country The country to get alternative titles from.
     * @returns A Promise of JSON data with alternative titles.
     */
    async getAlternativeTitlesAsync(country = undefined) {

        let urlParameters = { ...this._getBaseUrlParameters() };
        
        if (country) {
            urlParameters["country"] = country;
        }

        return await this.getChildQueryResultAsync(dataTypes.ALTERNATIVE_TITLES, urlParameters);
    }

    /**
     * Gets the changes of the movie in question.
     * 
     * @param {string} startDate The start date.
     * @param {string} endDate The end date.
     * @param {Number} page The page.
     * 
     * @returns A Promise of JSON data with movie changes.
     */
    async getChangesAsync(startDate = undefined, endDate = undefined, page = null) {
        return await tmdbUtils.getChangesAsync(this, startDate, endDate, page);
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
     * @param {string} includeImageLanguage The include_image_language parameter.
     * @returns A Promise of JSON data with movie images.
     */
    async getImagesAsync(includeImageLanguage = undefined) {
        
        let urlParameters = { ...this._getBaseUrlParameters() };
        
        if (include_image_language) {
            urlParameters["include_image_language"] = includeImageLanguage;
        }

        return await this.getChildQueryResultAsync(dataTypes.IMAGES, urlParameters);
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
     * @param {Number} page The page.
     * @returns A Promise of JSON data with recommendations.
     */
    async getRecommendationsAsync(page = null) {
        
        let urlParameters = { ...this._getBaseUrlParameters() };

        if (page) {
            urlParameters["page"] = page;
        }

        return await this.getChildQueryResultAsync(dataTypes.RECOMMENDATIONS, urlParameters);
    }

    /**
     * Gets the similar movies to the movie in question.
     * @param {Number} page The page.
     * @returns A Promise of JSON data with similar movies.
     */
    async getSimilarMoviesAsync(page = null) {
        
        let urlParameters = { ...this._getBaseUrlParameters() };

        if (page) {
            urlParameters["page"] = page;
        }

        return await this.getChildQueryResultAsync(dataTypes.SIMILAR_MOVIES, urlParameters);
    }

    /**
     * Gets the reviews of the movie in question.
     * @param {Number} page The page.
     * @returns A Promise of JSON data with movie reviews.
     */
    async getReviewsAsync(page = null) {
        
        let urlParameters = { ...this._getBaseUrlParameters() };

        if (page) {
            urlParameters["page"] = page;
        }

        return await this.getChildQueryResultAsync(dataTypes.REVIEWS, urlParameters);
    }

    /**
     * Gets the lists of the movie in question.
     * @param {Number} page The page.
     * @returns A Promise of JSON data with lists.
     */
    async getListsAsync(page = null) {
        
        let urlParameters = { ...this._getBaseUrlParameters() };

        if (page) {
            urlParameters["page"] = page;
        }

        return await this.getChildQueryResultAsync(dataTypes.LISTS, urlParameters);
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
     * @param {Number} page The page.
     * @param {string} region The region.
     * @returns A Promise of JSON data with the movies that are currently playing.
     */
    async getNowPlayingAsync(page = null, region = undefined) {
        return await this.__getRegionData(dataTypes.NOW_PLAYING, page, region)
    }

    /**
     * Gets popular movies.
     * @param {Number} page The page.
     * @param {string} region The region.
     * @returns A Promise of JSON data with popular movies.
     */
    async getPopularAsync(page = null, region = undefined) {
        return await this.__getRegionData(dataTypes.POPULAR, page, region)
    }

    /**
     * Gets top rated movies.
     * @returns A Promise of JSON data with top rated movies.
     */
    async getTopRatedAsync() {
        return await this.__getRegionData(dataTypes.TOP_RATED, page, region)
    }

    /**
     * Gets upcoming movies.
     * @returns A Promise of JSON data with upcoming movies.
     */
    async getUpcomingAsync() {
        return await this.__getRegionData(dataTypes.UPCOMING, page, region)
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

    async __getRegionData(datatype, page = null, region = undefined) {
        let urlParameters = { ...this._getBaseUrlParameters() };

        if (page) {
            urlParameters["page"] = page;
        }

        if (region) {
            urlParameters["region"] = region;
        }

        return await this.getChildQueryResultAsync(datatype, urlParameters);
    }
}