const assert = require('assert');
const tmdbUtils = require('../../src/utils/tmdb_utils');
const tmdbTestUtils = require('./utils/tmdb_test_utils');
const getApiKey = require('./utils/tmdb_test_utils').getApiKeyAsync;

const tests = [
    require('./utils/tmdb_utils_test'),
    require('./authentication/authentication_test'),
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
    require('./sections/tv_show_test'),
    require('./sections/watch_provider_test')
]

exports.runTest = () => {

    describe('TMDb API Wrapper', () => {

        it('Unit Tests', async () => {

            let apiKey = await getApiKey();
            assert.ok(apiKey);

            // Get login information
            let loginInfo = await tmdbTestUtils.getLoginInformationAsync();

            // Create a session
            let sessionId = await tmdbUtils.createLoginSessionAsync(apiKey, loginInfo.username, loginInfo.password);
            assert.ok(sessionId);
            console.log("Successfully created a session.");

            // After all tests have finished, delete the session
            after(async () => {
                await tmdbUtils.deleteSessionAsync(apiKey, sessionId);
                console.log("Successfully deleted the session.");
            });

            // Run all tests
            tests.forEach(test => {
                test.runTest({ "apiKey": apiKey, "sessionId": sessionId });
            });
        });
    });
}