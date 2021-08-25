const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId) => {

    let tmdb = new Tmdb(apiKey);

    describe('Movie GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all GET query methods

        // Look for movie data
        let madMaxMovie = {id: 76341, title: "Mad Max: Fury Road"};

        it('Should find data about a movie.', done => {
            tmdb.getMovieSection().getMovie(madMaxMovie.id).getDetailsAsync().then(json => {
              
                // Assert the results
                assert.ok(json);
                assert.strictEqual(json.title, madMaxMovie.title);
                assert.ok(!json.hasOwnProperty("videos"));
                assert.ok(!json.hasOwnProperty("images"));

                setImmediate(done);
            })
        });

        it('Should find data about a movie with "Append to Response".', done => {

            tmdb.getMovieSection().getMovie(madMaxMovie.id).getDetailsAsync("videos", "images").then(json => {

                // Assert the results
                assert.ok(json);
                assert.ok(json.hasOwnProperty("videos"));
                assert.ok(json.hasOwnProperty("images"));

                setImmediate(done);
            })
        });

        it('Should find movie credit data.', done => {
            tmdb.getMovieSection().getMovie(madMaxMovie.id).getCreditsAsync().then(json => {
                
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            });
        });

        it('Should find movie certification data.', done => {
            tmdb.getMovieSection().getCertificationsAsync().then(json => {
                
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

                let movie = tmdb.getMovieSection().getMovie("16869");
                assert.ok(await movie.rateAsync(10, sessionId));
                assert.ok(await movie.deleteRatingAsync(sessionId));
            });
        });
    }
}