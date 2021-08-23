const assert = require('assert');
const tmdbUtils = require('../../src/utils/tmdb_utils');
const getApiKey = require('./utils/tmdb_test_utils').getApiKey;

const tests = [
    require('./utils/tmdb_utils_test'),
    require('./sections/account_test'),
    require('./sections/collection_test'),
    require('./sections/company_test'),
    require('./sections/configuration_test'),
    require('./sections/credit_test'),
    require('./sections/discover_test'),
    require('./sections/find_test'),
    require('./sections/genre_test'),
    require('./sections/guest_session_test'),
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

    describe('TMDB API Wrapper', () => {

        it('Unit Tests', async () => {

            let apiKey = await getApiKey();
            assert.ok(apiKey);

            // Get a session id if possible
            let sessionId = undefined;
            if (!process.env.CI) {
                sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                after(async () => {
                    await tmdbUtils.deleteSession(apiKey, sessionId);
                });
            }

            tests.forEach(test => {
                test.runTest(apiKey, sessionId);
            });
        });
    });
}