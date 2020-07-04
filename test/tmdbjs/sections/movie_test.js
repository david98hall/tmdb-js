const assert = require('assert');
const tmdbjs = require('../../../src/tmdbjs/tmdbjs');
const tmdbTestUtils = require('../utils/tmdb_test_utils');

exports.runTest = apiKey => {

    var tmdb = tmdbjs.tmdb(apiKey);

    describe('Movie GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all GET query methods

        it('Should find data about a movie.', done => {

            // Look for movie data
            var movie = {id: 76341, title: "Mad Max: Fury Road"};
            
            tmdb.movie(movie.id).getDetails().then(json => {
              
                // Assert the results
                assert.equal(json.title, movie.title);
                
                setImmediate(done);
            })
        });
    });

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Movie session query tests', () => {
        
            it('Should rate and unrate a movie', async () => {
                var sessionId = await tmdbTestUtils.getSessionId();
                assert.ok(sessionId);

                var movie = tmdb.movie(16869);
                assert.ok(await movie.rate(10, sessionId));
                assert.ok(await movie.deleteRating(sessionId));
            });
    
        });
    }
}