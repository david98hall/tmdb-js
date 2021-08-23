const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

// TMDB utils
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const externalSources = tmdbUtils.externalSources;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Find query tests.', () => {

        // TODO [david98hall, 2021-08-14]: Test the other external sources

        it('Find movie in external Source: IMDB.', done => {

            let movie = {id: 'tt0074256', title: 'Bugsy Malone'};
            tmdb.getFinder(externalSources.IMDB_ID).find(movie.id).then(json => {
            
                assert.strictEqual(json["movie_results"][0]["title"], movie.title);

                setImmediate(done);
            });
        });
    });
}