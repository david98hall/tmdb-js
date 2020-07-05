const httpUtils = require('../../utils/http_utils');
const httpMethod = httpUtils.httpMethod;
const TmdbQuerier = require('../api/tmdb_querier').TmdbQuerier;

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
exports.Searcher = class extends TmdbQuerier {

    /**
     * Sets properties.
     * @param {string} apiKey A TMDB API key.    
     * @param {string} language The natural language of search queries. The default is "en-US". 
     */
    constructor(apiKey, language = "en-US") {
        super(apiKey, language);
    }

    // TODO [David Hall, 2020-07-05]: Add support for all search queries

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
        return searchPages(
            searchTerm, 
            searchType.MULTI, 
            this._apiKey, 
            startPage, 
            pageCount, 
            includeAdult, 
            this._language);
    }
}

/**
 * All different search types on TMDB.
 */
const searchType = {
    MULTI: 'multi'
}

/**
 * Gets search data from TMDB as a JSON object.
 * @param {string} searchTerm The search term (query).
 * @param {string} searchType The type of search to perform. 
 * @param {string} apiKey The API key to the TMDB API. 
 * @param {Number} startPage 
 * The first search result page to return data from.
 * @param {Number} pageCount 
 * The number of search result pages to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 * @param {string} language 
 * The language of the search results. Default value is "en-US".
 */
async function searchPages(searchTerm, searchType, apiKey, startPage, 
    pageCount, includeAdult = true, language = "en-US") {
    
        // Throw an error if the page related parameters are invalid
        if (startPage < 1 || pageCount < 1) {
            throw "startPage and pageCount have to be larger or equal to 1.";
        }

        // Search the first page in order to get the total number of pages.
        // Used to interrupt when there are no pages left to search.
        var firstPage = await searchPage(searchTerm, searchType, apiKey, 
            startPage, includeAdult, language);

        // The page count is 1, no more pages should thus be searched
        if (pageCount == 1) 
            return [firstPage];

        // Update the page count, in case it exceeds the total number of pages
        pageCount = Math.min(pageCount, firstPage.total_pages - startPage);

        // Create one search promise per page
        var promises = [];
        for (let index = 1; index <= pageCount; index++) {
            var page = startPage + index;
            var promise = searchPage(
                searchTerm, searchType, apiKey, 
                page, includeAdult, language);
            promises.push(promise);
        }
        
        // Add the rest of the resulting pages to the first one
        return await Promise
            .all(promises)
            .then(restOfPages => [firstPage, ...restOfPages]);
}

/**
 * Gets search data from TMDB as a JSON object.
 * @param {string} searchTerm The search term (query).
 * @param {string} searchType The type of search to perform. 
 * @param {string} apiKey The API key to the TMDB API. 
 * @param {Number} page The search result page to return data from.
 * @param {Boolean} includeAdult true if adult content will be included.
 * @param {string} language 
 * The language of the search results. Default value is "en-US".
 */
function searchPage(searchTerm, searchType, apiKey, 
    page = 1, includeAdult = true, language = "en-US") {

        // Create the url, based on this function's parameters
        const baseUrl = "https://api.themoviedb.org/3/search/";
        var url = baseUrl + searchType;
        url += "?api_key=" + apiKey;
        url += "&language=" + language;
        url += "&query=" + encodeURI(searchTerm);
        url += "&page=" + page;
        url += "&include_adult=" + includeAdult;

        return httpUtils.parseHttpRequest(url, httpMethod.GET, JSON.parse);
}