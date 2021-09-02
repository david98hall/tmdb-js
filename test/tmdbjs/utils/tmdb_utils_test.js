const assert = require('assert');
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const tmdbTestUtils = require('./tmdb_test_utils');
const {WatchProvidersSection} = require("../../../src/tmdb-js/sections/types/watch_provider");
const {sections} = require("../../../src/utils/tmdb_utils");

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    describe('TMDb Utility Function Tests', () => {

        it('Should get a request token', async () => {
            const token = await tmdbUtils.getRequestTokenAsync(apiKey);
            assert.ok(token);
        });

        it('Should build TMDb URLs correctly', () => {
            let section = new WatchProvidersSection(apiKey).createChild(sections.MOVIE);
            let urlParameters1 = {
                "api_key": apiKey,
                "language": "en-US",
                "watch_region": undefined
            }
            let url1 = tmdbUtils.buildUrl(section.toString(), urlParameters1)
            let expected1 = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=${urlParameters1.language}`;
            assert.strictEqual(url1, expected1)

            let urlParameters2 = {
                "api_key": apiKey,
                "language": "en-US",
                "watch_region": "New York"
            }
            let url2 = tmdbUtils.buildUrl(section.toString(), urlParameters2)
            let expected2 = expected1 + "&watch_region=New%20York";
            assert.strictEqual(url2, expected2)
        });
    });
};