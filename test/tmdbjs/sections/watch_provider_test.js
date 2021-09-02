const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Watch Providers Tests', () => {

        it('Should get available region data.', async () => {
            let data = await tmdb.getWatchProvidersSection().getAvailableRegionsAsync();
            assert.ok(data);
            assert.ok(data["results"])
            assert.ok(data["results"].length > 0)
        });

        it('Should get movie provider data.', async () => {
            let data = await tmdb.getWatchProvidersSection().getMovieProvidersAsync();
            assert.ok(data);
            assert.ok(data["results"])
            assert.ok(data["results"].length > 0)
        });

        it('Should get TV show provider data.', async () => {
            let data = await tmdb.getWatchProvidersSection().getTvShowProvidersAsync();
            assert.ok(data);
            assert.ok(data["results"])
            assert.ok(data["results"].length > 0)
        });
    });
}