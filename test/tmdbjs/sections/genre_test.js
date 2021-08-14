const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Genre GET tests', () => {
        
            it('Get movie genre list.', done => {
                tmdb.getGenres().getMovieGenres().then(json => {

                    // Assert the results
                    assert.ok(json);
                
                    setImmediate(done);
                })
            });

            it('Get TV show genre list.', done => {
                tmdb.getGenres().getTvShowGenres().then(json => {

                    // Assert the results
                    assert.ok(json);
                
                    setImmediate(done);
                })
            });
    
        });
    }
}