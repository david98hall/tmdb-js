const assert = require('assert');
const getApiKey = require('./utils/tmdb_test_utils').getApiKey;
const tmdbUtilsTest = require('./utils/tmdb_utils_test');
const movieTest = require('./sections/movie_test');
const tvShowTest = require('./sections/tv_show_test');
const searchTest = require('./search/search_test');

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
            tvShowTest.runTest(apiKey);
            searchTest.runTest(apiKey);
        });
    });
}