const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Genre GET tests', () => {

        it('Get movie genre list.', done => {
            tmdb.getGenreSection().getMovieGenresAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });

        it('Get TV show genre list.', done => {
            tmdb.getGenreSection().getTvShowGenresAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });
    });
}