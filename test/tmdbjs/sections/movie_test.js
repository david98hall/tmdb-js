const assert = require('assert');
const tmdbjs = require('../../../src/tmdbjs/tmdbjs');

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

    describe('Movie POST query tests', () => {
        // TODO [David Hall, 2020-06-28]: Test all POST query methods
    });
}