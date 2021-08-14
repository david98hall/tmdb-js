const assert = require('assert');
const getApiKey = require('./utils/tmdb_test_utils').getApiKey;
const tmdbUtilsTest = require('./utils/tmdb_utils_test');
const movieTest = require('./sections/movie_test');
const networkTest = require('./sections/network_test');
const peopleTest = require('./sections/people_test');
const reviewTest = require('./sections/review_test');
const searchTest = require('./search/search_test');
const trendingTest = require('./sections/trending_test');
const tvShowTest = require('./sections/tv_show_test');



exports.runTest = () => {
    
    describe('TMDB API Tests', () => {

        it('Should retrieve the API key.', done => {
            // Check that the API key can be found without error
            getApiKey().then(apiKey => {
                assert.notStrictEqual(apiKey, null);
                setImmediate(done);
            });
        });
    
        getApiKey().then(apiKey => {
            tmdbUtilsTest.runTest(apiKey);
            movieTest.runTest(apiKey);
            networkTest.runTest(apiKey);
            peopleTest.runTest(apiKey);
            reviewTest.runTest(apiKey);
            searchTest.runTest(apiKey);
            trendingTest.runTest(apiKey);
            tvShowTest.runTest(apiKey);
        });
    });
}