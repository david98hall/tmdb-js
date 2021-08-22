const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbTestUtils = require('../utils/tmdb_test_utils');

exports.runTest = apiKey => {

    let tmdb = new Tmdb(apiKey);

    describe('Movie GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all GET query methods

        // Look for movie data
        let madMaxMovie = {id: 76341, title: "Mad Max: Fury Road"};

        it('Should find data about a movie.', done => {
            tmdb.getMovies().getMovie(madMaxMovie.id).getDetails().then(json => {
              
                // Assert the results
                assert.ok(json);
                assert.strictEqual(json.title, madMaxMovie.title);
                assert.ok(!json.hasOwnProperty("videos"));
                assert.ok(!json.hasOwnProperty("images"));

                setImmediate(done);
            })
        });

        it('Should find data about a movie with "Append to Response".', done => {

            tmdb.getMovies().getMovie(madMaxMovie.id).getDetails("videos", "images").then(json => {

                // Assert the results
                assert.ok(json);
                assert.ok(json.hasOwnProperty("videos"));
                assert.ok(json.hasOwnProperty("images"));

                setImmediate(done);
            })
        });

        it('Should find movie credit data.', done => {
            tmdb.getMovies().getMovie(madMaxMovie.id).getCredits().then(json => {
                
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            });
        });

        it('Should find movie certification data.', done => {
            tmdb.getMovies().getCertifications().then(json => {
                
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            });
        });

    });

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Movie session query tests', () => {
        
            it('Should rate and unrate a movie', async () => {
                let sessionId = await tmdbTestUtils.getSessionId();
                assert.ok(sessionId);

                let movie = tmdb.getMovies().getMovie(16869);
                assert.ok(await movie.rate(10, sessionId));
                assert.ok(await movie.deleteRating(sessionId));
            });
    
        });
    }
}