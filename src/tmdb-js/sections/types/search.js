/**@module tmdb-js/sections/types */

// TMDb utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

const Section = require('../section').Section;

/**
 * A class that represents the search section in TMDb.
 */
exports.SearchSection = class extends Section {

    /**
     * Initializes this object.
     * @param {string} apiKey A TMDb API key.
     * @param {string} language The natural language of search queries. The default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.SEARCH, undefined, apiKey, language);
    }

    /**
     * Gets data from a company search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     *
     * @returns {Promise<*>} A Promise of JSON data with search results of companies.
     */
    async searchCompaniesAsync(searchTerm, startPage = 1, pageCount = 1) {
        let companiesChild = this.createChild(searchType.COMPANIES);
        return await searchPagesAsync(
            companiesChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            false,
            this._language);
    }

    /**
     * Gets data from a collection search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     *
     * @returns {Promise<*>} A Promise of JSON data with search results of collections.
     */
    async searchCollectionsAsync(searchTerm, startPage = 1, pageCount = 1) {
        let collectionsChild = this.createChild(searchType.COLLECTIONS);
        return await searchPagesAsync(
            collectionsChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            false,
            this._language);
    }

    /**
     * Gets data from a keyword search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     *
     * @returns {Promise<*>} A Promise of JSON data with search results of keywords.
     */
    async searchKeywordsAsync(searchTerm, startPage = 1, pageCount = 1) {
        let keywordsChild = this.createChild(searchType.KEYWORDS);
        return await searchPagesAsync(
            keywordsChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            false,
            this._language);
    }

    /**
     * Gets data from a movie search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult
     * true if adult content will be included. The default is true.
     * @param {string} region The region.
     * @param {Number} year The year.
     * @param {Number} primaryReleaseYear The primary release year.
     *
     * @returns {Promise<*>} A Promise of JSON data with search results of movies.
     */
    async searchMoviesAsync(searchTerm,
                            startPage = 1,
                            pageCount = 1,
                            includeAdult = true,
                            region = undefined,
                            year = undefined,
                            primaryReleaseYear = undefined) {

        // Additional optional query info
        let additionalInfo = {
            "region": region,
            "year": year,
            "primary_release_year": primaryReleaseYear
        };

        let moviesChild = this.createChild(searchType.MOVIES);

        return await searchPagesAsync(
            moviesChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            includeAdult,
            this._language,
            additionalInfo);
    }

    /**
     * Gets data from a multi search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult
     * true if adult content will be included. The default is true.
     *
     * @returns {Promise<*>} A Promise of JSON data with multi-search results.
     */
    async multiSearchAsync(searchTerm, startPage = 1, pageCount = 1, includeAdult = true) {

        let multiChild = this.createChild(searchType.MULTI);

        return await searchPagesAsync(
            multiChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            includeAdult,
            this._language);
    }

    /**
     * Gets data from a people search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult
     * true if adult content will be included. The default is true.
     * @param {string} region The region.
     *
     * @returns {Promise<*>} A Promise of JSON data with search results of people.
     */
    async searchPeopleAsync(searchTerm,
                            startPage = 1,
                            pageCount = 1,
                            includeAdult = true,
                            region = undefined) {

        // Additional optional query info
        let additionalInfo = {"region": region};

        let peopleChild = this.createChild(searchType.PEOPLE);

        return await searchPagesAsync(
            peopleChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            includeAdult,
            this._language,
            additionalInfo);
    }

    /**
     * Gets data from a TV show search in TMDb.
     *
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult
     * true if adult content will be included. The default is true.
     * @param {Number} firstAirDateYear The first air date year.
     *
     * @returns {Promise<*>} A Promise of JSON data with search results of TV shows.
     */
    async searchTvShowsAsync(searchTerm,
                             startPage = 1,
                             pageCount = 1,
                             includeAdult = true,
                             firstAirDateYear = undefined) {

        // Additional optional query info
        let additionalInfo = {"first_air_date_year": firstAirDateYear};

        let tvShowChild = this.createChild(searchType.TV_SHOWS);

        return await searchPagesAsync(
            tvShowChild.toString(),
            searchTerm,
            this._apiKey,
            startPage,
            pageCount,
            includeAdult,
            this._language,
            additionalInfo);
    }
}

/**
 * All different search types on TMDb.
 */
const searchType = {
    COMPANIES: 'company',
    COLLECTIONS: 'collection',
    KEYWORDS: 'keyword',
    MOVIES: 'movie',
    MULTI: 'multi',
    PEOPLE: 'person',
    TV_SHOWS: 'tv'
}

/**
 * Gets search data from TMDb as a JSON object.
 *
 * @param {string} url The url.
 * @param {string} searchTerm The search term (query).
 * @param {string} apiKey The API key to the TMDb API.
 * @param {Number} startPage
 * The first search result page to return data from.
 * @param {Number} pageCount
 * The number of search result pages to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 * @param {string} language
 * The language of the search results. Default value is "en-US".
 * @param {Object} additionalInfo
 * Additional info to add to the search query.
 *
 * @returns {Promise<*>} A Promise of JSON data with search results.
 */
async function searchPagesAsync(url, searchTerm, apiKey, startPage,
                                pageCount, includeAdult = true, language = "en-US", additionalInfo = {}) {

    // Throw an error if the page related parameters are invalid
    if (startPage < 1 || pageCount < 1) {
        throw "startPage and pageCount have to be larger or equal to 1.";
    }

    // Search the first page in order to get the total number of pages.
    // Used to interrupt when there are no pages left to search.
    let firstPage = await searchPageAsync(url,
        searchTerm,
        apiKey,
        startPage,
        includeAdult,
        language,
        additionalInfo);

    // The page count is 1, no more pages should thus be searched
    if (pageCount === 1)
        return [firstPage];

    // Update the page count, in case it exceeds the total number of pages
    pageCount = Math.min(pageCount, firstPage["total_pages"] - startPage);

    // Create one search promise per page
    let promises = [];
    for (let index = 1; index <= pageCount; index++) {
        let page = startPage + index;
        let promise = searchPageAsync(url,
            searchTerm,
            apiKey,
            page,
            includeAdult,
            language,
            additionalInfo);
        promises.push(promise);
    }

    // Add the rest of the resulting pages to the first one
    return await Promise
        .all(promises)
        .then(restOfPages => [firstPage, ...restOfPages]);
}

/**
 * Gets search data from TMDb as a JSON object.
 * @param {string} url The url path.
 * @param {string} searchTerm The search term (query).
 * @param {string} apiKey The API key to the TMDb API.
 * @param {Number} page The search result page to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 * @param {string} language
 * The language of the search results. Default value is "en-US".
 * @param {Object} additionalInfo
 * Additional info to add to the search query.
 *
 * @returns {Promise<*>} A Promise of JSON data of the specified page.
 */
async function searchPageAsync(url,
                               searchTerm,
                               apiKey,
                               page = 1,
                               includeAdult = true,
                               language = "en-US",
                               additionalInfo = {}) {

    let parameters = {
        "api_key": apiKey,
        "language": language,
        "query": searchTerm,
        "page": page,
        "include_adult": includeAdult,
        ...additionalInfo
    };

    return await tmdbUtils.getDataAsync(url, parameters);
}