/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

const Section = require('../section').Section;

/**
 * @param {string} apiKey The API key to the TMDB API.
 * @param {string} language
 * The language of the search results. Default value is "en-US".
 * @param {Number} startPage 
 * The first search result page to return data from.
 * @param {Number} pageCount 
 * The number of search result pages to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 */
exports.SearchSection = class extends Section {

    /**
     * Sets properties.
     * @param {string} apiKey A TMDB API key.    
     * @param {string} language The natural language of search queries. The default is "en-US". 
     */
    constructor(apiKey, language = "en-US") {
        super(sections.SEARCH, undefined, apiKey, language);
    }

    /**
     * Gets data from a company search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    searchCompanies(searchTerm, startPage = 1, pageCount = 1) {
        var companiesChild = this.createChild(searchType.COMPANIES);
        return searchPages(
            companiesChild.toString(),
            searchTerm, 
            this._apiKey, 
            startPage, 
            pageCount, 
            false,
            this._language);
    }

    /**
     * Gets data from a collection search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    searchCollections(searchTerm, startPage = 1, pageCount = 1) {
        var collectionsChild = this.createChild(searchType.COLLECTIONS);
        return searchPages(
            collectionsChild.toString(),
            searchTerm,
            this._apiKey, 
            startPage, 
            pageCount, 
            false,
            this._language);
    }

    /**
     * Gets data from a keyword search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    searchKeywords(searchTerm, startPage = 1, pageCount = 1) {
        var keywordsChild = this.createChild(searchType.KEYWORDS);
        return searchPages(
            keywordsChild.toString(),
            searchTerm, 
            this._apiKey,
            startPage, 
            pageCount, 
            false,
            this._language);
    }

    /**
     * Gets data from a movie search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    searchMovies(searchTerm,
                 startPage = 1,
                 pageCount = 1,
                 includeAdult = true,
                 region = "",
                 year = "",
                 primaryReleaseYear = "") {
        
        // Additional optional query info
        var additionalInfo = {};
        
        if (region.length > 0) {
            additionalInfo["region"] = region;
        }
        
        if (year.length > 0) {
            additionalInfo["year"] = year;
        }

        if (primaryReleaseYear.length > 0) {
            additionalInfo["primary_release_year"] = primaryReleaseYear;
        }

        var moviesChild = this.createChild(searchType.MOVIES);
        
        return searchPages(
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
     * Gets data from a multi search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    multiSearch(searchTerm, startPage = 1, pageCount = 1, includeAdult = true) {

        var multiChild = this.createChild(searchType.MULTI);

        return searchPages(
            multiChild.toString(),
            searchTerm, 
            this._apiKey, 
            startPage, 
            pageCount, 
            includeAdult, 
            this._language);
    }

    /**
     * Gets data from a people search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    searchPeople(searchTerm,
        startPage = 1,
        pageCount = 1,
        includeAdult = true,
        region = "") {

        // Additional optional query info
        var additionalInfo = {};
        if (region.length > 0) {
            additionalInfo["region"] = region;
        }

        var peopleChild = this.createChild(searchType.PEOPLE);

        return searchPages(
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
     * Gets data from a TV show search in TMDB.
     * @param {string} searchTerm The search term (query).
     * @param {Number} startPage 
     * The first search result page to return data from. The default is 1.
     * @param {Number} pageCount 
     * The number of search result pages to return data from. The default is 1.
     * @param {Boolean} includeAdult 
     * true if adult content will be included. The default is true.
     */
    searchTvShows(searchTerm,
        startPage = 1,
        pageCount = 1,
        includeAdult = true,
        firstAirDateYear = "") {

        // Additional optional query info
        var additionalInfo = {};
        if (firstAirDateYear.length > 0) {
            additionalInfo["first_air_date_year"] = firstAirDateYear;
        }

        var tvShowChild = this.createChild(searchType.TV_SHOWS);

        return searchPages(
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
 * All different search types on TMDB.
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
 * Gets search data from TMDB as a JSON object.
 * @param {string} url The url.
 * @param {string} searchTerm The search term (query).
 * @param {string} apiKey The API key to the TMDB API. 
 * @param {Number} startPage 
 * The first search result page to return data from.
 * @param {Number} pageCount 
 * The number of search result pages to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 * @param {string} language 
 * The language of the search results. Default value is "en-US".
 * @param {Object} additionalInfo
 * Additional info to add to the search query.
 */
async function searchPages(url, searchTerm, apiKey, startPage, 
    pageCount, includeAdult = true, language = "en-US", additionalInfo = {}) {
    
        // Throw an error if the page related parameters are invalid
        if (startPage < 1 || pageCount < 1) {
            throw "startPage and pageCount have to be larger or equal to 1.";
        }

        // Search the first page in order to get the total number of pages.
        // Used to interrupt when there are no pages left to search.
        var firstPage = await searchPage(url,
                                         searchTerm,
                                         apiKey,
                                         startPage,
                                         includeAdult,
                                         language,
                                         additionalInfo);

        // The page count is 1, no more pages should thus be searched
        if (pageCount == 1) 
            return [firstPage];

        // Update the page count, in case it exceeds the total number of pages
        pageCount = Math.min(pageCount, firstPage.total_pages - startPage);

        // Create one search promise per page
        var promises = [];
        for (let index = 1; index <= pageCount; index++) {
            var page = startPage + index;
            var promise = searchPage(url,
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
 * Gets search data from TMDB as a JSON object.
 * @param {string} url The url path.
 * @param {string} searchTerm The search term (query).
 * @param {string} searchType The type of search to perform. 
 * @param {string} apiKey The API key to the TMDB API. 
 * @param {Number} page The search result page to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 * @param {string} language 
 * The language of the search results. Default value is "en-US".
 * @param {Object} additionalInfo
 * Additional info to add to the search query.
 */
function searchPage(url, searchTerm, apiKey, 
    page = 1, includeAdult = true, language = "en-US", additionalInfo = {}) {
        
    parameters = {
        "api_key": apiKey,
        "language": language,
        "query": encodeURI(searchTerm),
        "page": page,
        "include_adult": includeAdult
    };
    parameters = {...parameters, ...additionalInfo};

    return tmdbUtils.getData(url, parameters);
}