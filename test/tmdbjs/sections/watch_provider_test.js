const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Watch Providers Tests', () => {

        it('Should get movie provider data.', async () => {
            let data = await tmdb.getWatchProvidersSection().getMovieProvidersAsync();
            assert.ok(data);
            assert.ok(data["results"])
            assert.ok(data["results"].length > 0)
        })

        // TODO [david98hall, 2021-08-30]: Test the remaining methods
    });
}