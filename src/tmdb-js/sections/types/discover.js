/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const Section = require('../section').Section;

class DiscoverSettings {

    _parameters = {};

    getAllParameters() {
        let parameters = {}
        Object.assign(parameters, this._parameters);
        return parameters;
    }

    setSortBy(sortBy) {
        this._parameters["sort_by"] = sortBy;
    }

    setPage(page) {
        this._parameters["page"] = page;
    }

    setVoteCountGte(limit) {
        this._parameters["vote_count.gte"] = limit;
    }

    setVoteAverageGte(limit) {
        this._parameters["vote_average.gte"] = limit;
    }

    setWithGenres(...genreIds) {
        this._setWithParameter("with_genres", genreIds);
    }

    setWithoutGenres(...genreIds) {
        this._setWithParameter("without_genres", genreIds);
    }

    setWithRuntimeGte(limit) {
        this._parameters["with_runtime.gte"] = limit;
    }

    setWithRuntimeLte(limit) {
        this._parameters["with_runtime.lte"] = limit;
    }

    setWithKeywords(...keywords) {
        this._setWithParameter("with_keywords", keywords);
    }

    setWithoutKeywords(...keywords) {
        this._setWithParameter("without_keywords", keywords);
    }

    setWithOriginalLanguage(withOriginalLanguage) {
        this._parameters["with_original_language"] = withOriginalLanguage;
    }

    setWatchRegion(watchRegion) {
        this._parameters["watch_region"] = watchRegion;
    }

    setWithCompanies(...companyIds) {
        this._setWithParameter("with_companies", companyIds);
    }

    setWithWatchProviders(...providerIds) {
        this._setWithParameter("with_watch_providers", providerIds);
    }

    setWithWatchMonetizationTypes(watchMonetizationTypes) {
        this._parameters["with_watch_monetization_types"] = watchMonetizationTypes;
    }

    _setWithParameter(withType, ...elements) {
        this._parameters[withType] = elements.join(",");
    }
}

exports.DiscoverMovieSettings = class extends DiscoverSettings {

    setRegion(region) {
        this._parameters["region"] = region;
    }

    setCertificationCountry(country) {
        this._parameters["certification_country"] = country;
    }

    setCertification(certification) {
        this._parameters["certification"] = certification;
    }

    setCertificationLte(limit) {
        this._parameters["certification.lte"] = limit;
    }

    setCertificationGte(limit) {
        this._parameters["certification.gte"] = limit;
    }

    setIncludeAdult(includeAdult) {
        this._parameters["include_adult"] = includeAdult;
    }

    setIncludeVideo(includeVideo) {
        this._parameters["include_video"] = includeVideo;
    }

    setPrimaryReleaseYear(year) {
        this._parameters["primary_release_year"] = year;
    }

    setPrimaryReleaseYearLte(limit) {
        this._parameters["primary_release_year.lte"] = limit;
    }

    setPrimaryReleaseYearGte(limit) {
        this._parameters["primary_release_year.gte"] = limit;
    }

    setReleaseDateGte(limit) {
        this._parameters["release_date.gte"] = limit;
    }

    setReleaseDateLte(limit) {
        this._parameters["release_date.lte"] = limit;
    }

    setWithReleaseType(withReleaseType) {
        this._parameters["with_release_type"] = withReleaseType;
    }

    setYear(year) {
        this._parameters["year"] = year;
    }

    setVoteCountLte(limit) {
        this._parameters["vote_count.lte"] = limit;
    }

    setVoteAverageLte(limit) {
        this._parameters["vote_average.lte"] = limit;
    }

    setWithCast(...personIds) {
        this._setWithParameter("with_cast", personIds);
    }

    setWithCrew(...personIds) {
        this._setWithParameter("with_crew", personIds);
    }

    setWithPeople(...personIds) {
        this._setWithParameter("with_people", personIds);
    }
}

exports.DiscoverTvShowSettings = class extends DiscoverSettings {

    setAirDateGte(limit) {
        this._parameters["air_date.gte"] = limit;
    }

    setAirDateLte(limit) {
        this._parameters["air_date.lte"] = limit;
    }

    setFirstAirDateGte(limit) {
        this._parameters["first_air_date.gte"] = limit;
    }

    setFirstAirDateLte(limit) {
        this._parameters["first_air_date.lte"] = limit;
    }

    setFirstAirDateYear(year) {
        this._parameters["first_air_date_year"] = year;
    }

    setTimezone(timezone) {
        this._parameters["timezone"] = timezone;
    }

    setWithNetworks(...networkIds) {
        this._setWithParameter("with_networks", networkIds);
    }

    setIncludeNullFirstAirDates(include) {
        this._parameters["include_null_first_air_dates"] = include;
    }



    setScreenedTheatrically(screenedTheatrically) {
        this._parameters["screened_theatrically"] = screenedTheatrically;
    }
}

exports.DiscoverSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.DISCOVER, undefined, apiKey, language);
    }

    /**
     * Discovers movie data based on the passed settings.
     * @param {exports.DiscoverMovieSettings} settings The discover settings.
     * @return A Promise of discovered movie data.
     */
    discoverMovies(settings) {
        let urlParameters = this.__buildUrlParameters(settings);
        return this.createChild(sections.MOVIE)
                   .getQueryResult(urlParameters);
    }

    /**
     * Discovers TV show data based on the passed settings.
     * @param {exports.DiscoverTvShowSettings} settings The discover settings.
     * @return A Promise of discovered TV show data.
     */
    discoverTvShows(settings) {
        let urlParameters = this.__buildUrlParameters(settings);
        return this.createChild(sections.TV_SHOW)
                   .getQueryResult(urlParameters);
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