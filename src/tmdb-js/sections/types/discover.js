/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

/**
 * A class that represents the general settings of the discover section in TMDb.
 */
class DiscoverSettings {

    _parameters = {};

    /**
     * Gets all of the parameters in this settings object.
     * See the TMDb API documentation for a comprehensive list of parameters.
     * @returns {*} All parameters in these settings.
     */
    getAllParameters() {
        let parameters = {}
        Object.assign(parameters, this._parameters);
        return parameters;
    }

    /**
     * Sets the value of the sort_by parameter.
     * @param {string} sortBy The parameter value (see tmdb_utils.sortingTypes for valid values).
     */
    setSortBy(sortBy) {
        this._parameters["sort_by"] = sortBy;
    }

    /**
     * Sets the value of the page parameter.
     * @param {Number} page The parameter value.
     */
    setPage(page) {
        this._parameters["page"] = page;
    }

    /**
     * Sets the value of the vote_count.gte ("gte" stands for "greater than or equal to") parameter.
     * @param {Number} limit The parameter value.
     */
    setVoteCountGte(limit) {
        this._parameters["vote_count.gte"] = limit;
    }

    /**
     * Sets the value of the vote_average.gte ("gte" stands for "greater than or equal to") parameter.
     * @param {Number} limit The parameter value.
     */
    setVoteAverageGte(limit) {
        this._parameters["vote_average.gte"] = limit;
    }

    /**
     * Sets the value of the with_genres parameter based on the passed genre IDs.
     * This will determine which genres to include in the discover results.
     * @param  {...string} genreIds The genre IDs.
     */
    setWithGenres(...genreIds) {
        this._setWithParameter("with_genres", genreIds);
    }

    /**
     * Sets the value of the without_genres parameter based on the passed genre IDs.
     * This will determine which genres not to include in the discover results.
     * @param  {...string} genreIds The genre IDs.
     */
    setWithoutGenres(...genreIds) {
        this._setWithParameter("without_genres", genreIds);
    }

    /**
     * Sets the value of the with_runtime.gte parameter ("gte" stands for "greater than or equal to").
     * @param {Number} limit The parameter value.
     */
    setWithRuntimeGte(limit) {
        this._parameters["with_runtime.gte"] = limit;
    }

    /**
     * Sets the value of the with_runtime.lte parameter ("lte" stands for "less than or equal to").
     * @param {Number} limit The parameter value.
     */
    setWithRuntimeLte(limit) {
        this._parameters["with_runtime.lte"] = limit;
    }

    /**
     * Sets the value of the with_keywords based on the passed keywords.
     * This will determine which keywords to include in the discover results.
     * @param  {...string} keywords The keywords.
     */
    setWithKeywords(...keywords) {
        this._setWithParameter("with_keywords", keywords);
    }

    /**
     * Sets the value of the without_keywords based on the passed keywords.
     * This will determine which keywords not to include in the discover results.
     * @param  {...string} keywords The keywords.
     */
    setWithoutKeywords(...keywords) {
        this._setWithParameter("without_keywords", keywords);
    }

    /**
     * Sets the value of the with_original_language parameter.
     * @param {string} withOriginalLanguage
     */
    setWithOriginalLanguage(withOriginalLanguage) {
        this._parameters["with_original_language"] = withOriginalLanguage;
    }

    /**
     * Sets the value of the watch_region parameter.
     * @param {string} watchRegion The parameter value.
     */
    setWatchRegion(watchRegion) {
        this._parameters["watch_region"] = watchRegion;
    }

    /**
     * Sets the value of the with_companies based on the passed company IDs.
     * This will determine which companies to include in the discover results.
     * @param  {...string} companyIds The company IDs.
     */
    setWithCompanies(...companyIds) {
        this._setWithParameter("with_companies", companyIds);
    }

    /**
     * Sets the value of the with_watch_providers based on the passed provider IDs.
     * This will determine which watch providers to include in the discover results.
     * @param  {...string} providerIds The watch provider IDs.
     */
    setWithWatchProviders(...providerIds) {
        this._setWithParameter("with_watch_providers", providerIds);
    }

    /**
     * Sets the value of the with_watch_monetization_types parameter.
     * @param {string} watchMonetizationTypes The parameter value.
     */
    setWithWatchMonetizationTypes(watchMonetizationTypes) {
        this._parameters["with_watch_monetization_types"] = watchMonetizationTypes;
    }

    _setWithParameter(withType, ...elements) {
        this._parameters[withType] = elements.join(",");
    }
}

/**
 * A class that represents the discover settings for movies.
 */
exports.DiscoverMovieSettings = class extends DiscoverSettings {

    /**
     * Sets the value of the region parameter.
     * @param {string} region The parameter value.
     */
    setRegion(region) {
        this._parameters["region"] = region;
    }

    /**
     * Sets the value of the certification_country parameter.
     * @param {string} country The parameter value.
     */
    setCertificationCountry(country) {
        this._parameters["certification_country"] = country;
    }

    /**
     * Sets the value of the certification parameter.
     * @param {string} certification The parameter value.
     */
    setCertification(certification) {
        this._parameters["certification"] = certification;
    }

    /**
     * Sets the value of the certification.lte parameter ("lte" stands for "less than or equal to").
     * @param {string} limit The parameter value.
     */
    setCertificationLte(limit) {
        this._parameters["certification.lte"] = limit;
    }

    /**
     * Sets the value of the certification.gte parameter ("gte" stands for "greater than or equal to").
     * @param {string} limit The parameter value.
     */
    setCertificationGte(limit) {
        this._parameters["certification.gte"] = limit;
    }

    /**
     * Sets the value of the include_adult parameter.
     * @param {boolean} includeAdult The parameter value.
     */
    setIncludeAdult(includeAdult) {
        this._parameters["include_adult"] = includeAdult;
    }

    /**
     * Sets the value of the include_video parameter.
     * @param {boolean} includeVideo The parameter value.
     */
    setIncludeVideo(includeVideo) {
        this._parameters["include_video"] = includeVideo;
    }

    /**
     * Sets the value of the primary_release_year parameter.
     * @param {Number} year The parameter value.
     */
    setPrimaryReleaseYear(year) {
        this._parameters["primary_release_year"] = year;
    }

    /**
     * Sets the value of the primary_release_year.lte parameter
     * ("lte" stands for "less than or equal to").
     * @param {Number} limit The parameter value.
     */
    setPrimaryReleaseYearLte(limit) {
        this._parameters["primary_release_year.lte"] = limit;
    }

    /**
     * Sets the value of the primary_release_year.gte parameter
     * ("gte" stands for "greater than or equal to").
     * @param {Number} limit The parameter value.
     */
    setPrimaryReleaseYearGte(limit) {
        this._parameters["primary_release_year.gte"] = limit;
    }

    /**
     * Sets the value of the release_date.gte parameter
     * ("gte" stands for "greater than or equal to").
     * @param {Number} limit The parameter value.
     */
    setReleaseDateGte(limit) {
        this._parameters["release_date.gte"] = limit;
    }

    /**
     * Sets the value of the release_date.lte parameter
     * ("lte" stands for "less than or equal to").
     * @param {Number} limit The parameter value.
     */
    setReleaseDateLte(limit) {
        this._parameters["release_date.lte"] = limit;
    }

    /**
     * Sets the value of the with_release_type parameter.
     * @param {string} withReleaseType The parameter value.
     */
    setWithReleaseType(withReleaseType) {
        this._parameters["with_release_type"] = withReleaseType;
    }

    /**
     * Sets the value of the year parameter.
     * @param {Number} year The parameter value.
     */
    setYear(year) {
        this._parameters["year"] = year;
    }

    /**
     * Sets the value of the vote_count.lte parameter
     * ("lte" stands for "less than or equal to").
     * @param {Number} limit The parameter value.
     */
    setVoteCountLte(limit) {
        this._parameters["vote_count.lte"] = limit;
    }

    /**
     * Sets the value of the vote_average.lte parameter
     * ("lte" stands for "less than or equal to").
     * @param {Number} limit The parameter value.
     */
    setVoteAverageLte(limit) {
        this._parameters["vote_average.lte"] = limit;
    }

    /**
     * Sets the value of the with_cast parameter based on the passed person IDs.
     * This will determine which cast members to include in the discover results.
     * @param  {...string} personIds The person IDs.
     */
    setWithCast(...personIds) {
        this._setWithParameter("with_cast", personIds);
    }

    /**
     * Sets the value of the with_crew parameter based on the passed person IDs.
     * This will determine which crew members to include in the discover results.
     * @param  {...string} personIds The person IDs.
     */
    setWithCrew(...personIds) {
        this._setWithParameter("with_crew", personIds);
    }

    /**
     * Sets the value of the with_people parameter based on the passed person IDs.
     * This will determine which people to include in the discover results.
     * @param  {...string} personIds The person IDs.
     */
    setWithPeople(...personIds) {
        this._setWithParameter("with_people", personIds);
    }
}

/**
 * A class that represents the discover settings for TV shows.
 */
exports.DiscoverTvShowSettings = class extends DiscoverSettings {

    /**
     * Sets the value of the air_date.gte parameter
     * ("gte" stands for "greater than or equal to").
     * @param {string} limit The parameter value.
     */
    setAirDateGte(limit) {
        this._parameters["air_date.gte"] = limit;
    }

    /**
     * Sets the value of the air_date.lte parameter
     * ("lte" stands for "less than or equal to").
     * @param {string} limit The parameter value.
     */
    setAirDateLte(limit) {
        this._parameters["air_date.lte"] = limit;
    }

    /**
     * Sets the value of the first_air_date.gte parameter
     * ("gte" stands for "greater than or equal to").
     * @param {string} limit The parameter value.
     */
    setFirstAirDateGte(limit) {
        this._parameters["first_air_date.gte"] = limit;
    }

    /**
     * Sets the value of the first_air_date.lte parameter
     * ("lte" stands for "less than or equal to").
     * @param {string} limit The parameter value.
     */
    setFirstAirDateLte(limit) {
        this._parameters["first_air_date.lte"] = limit;
    }

    /**
     * Sets the value of the first_air_date_year parameter
     * @param {Number} year The parameter value.
     */
    setFirstAirDateYear(year) {
        this._parameters["first_air_date_year"] = year;
    }

    /**
     * Sets the value of the timezone parameter.
     * @param {string} timezone The parameter value.
     */
    setTimezone(timezone) {
        this._parameters["timezone"] = timezone;
    }

    /**
     * Sets the value of the with_networks parameter based on the passed network IDs.
     * This will determine which networks to include in the discover results.
     * @param  {...string} networkIds The network IDs.
     */
    setWithNetworks(...networkIds) {
        this._setWithParameter("with_networks", networkIds);
    }

    /**
     * Sets the value of the include_null_first_air_dates parameter.
     * @param {boolean} include The parameter value.
     */
    setIncludeNullFirstAirDates(include) {
        this._parameters["include_null_first_air_dates"] = include;
    }

    /**
     * Sets the value of the screened_theatrically parameter.
     * @param {boolean} screenedTheatrically The parameter value.
     */
    setScreenedTheatrically(screenedTheatrically) {
        this._parameters["screened_theatrically"] = screenedTheatrically;
    }
}

/**
 * A class that represents the discover section of TMDb.
 */
exports.DiscoverSection = class extends Section {

    /**
     * Initializes this object.
     * @param {string} apiKey The TMDb API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.DISCOVER, undefined, apiKey, language);
    }

    /**
     * Discovers movie data based on the passed settings.
     * @param {exports.DiscoverMovieSettings} settings The discover settings.
     * @returns {Promise<*>} A Promise of discovered movie data.
     */
    async discoverMoviesAsync(settings) {
        let urlParameters = this.__buildUrlParameters(settings);
        return await this.createChild(sections.MOVIE)
            .getQueryResultAsync(urlParameters);
    }

    /**
     * Discovers TV show data based on the passed settings.
     * @param {exports.DiscoverTvShowSettings} settings The discover settings.
     * @returns {Promise<*>} A Promise of discovered TV show data.
     */
    async discoverTvShowsAsync(settings) {
        let urlParameters = this.__buildUrlParameters(settings);
        return await this.createChild(sections.TV_SHOW)
            .getQueryResultAsync(urlParameters);
    }

    __buildUrlParameters(discoverSettings) {

        if (!discoverSettings) {
            discoverSettings = new DiscoverSettings();
        }

        return {
            "api_key": this._apiKey,
            "language": this._language,
            ...discoverSettings.getAllParameters()
        };
    }
}