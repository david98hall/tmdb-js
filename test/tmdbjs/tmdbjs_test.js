const assert = require('assert');
const getApiKey = require('./utils/tmdb_test_utils').getApiKey;

const tests = [
    require('./utils/tmdb_utils_test'),
    require('./sections/collection_test'),
    require('./sections/company_test'),
    require('./sections/configuration_test'),
    require('./sections/credit_test'),
    require('./sections/find_test'),
    require('./sections/genre_test'),
    require('./sections/keyword_test'),
    require('./sections/list_test'),
    require('./sections/movie_test'),
    require('./sections/network_test'),
    require('./sections/people_test'),
    require('./sections/review_test'),
    require('./sections/search_test'),
    require('./sections/trending_test'),
    require('./sections/tv_show_test')
]

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
            tests.forEach(test => {
                test.runTest(apiKey);
            });
        });
    });
}