const assert = require('assert');
const tmdbjs = require('../../../src/tmdbjs/tmdbjs');

exports.runTest = apiKey => {

    var tmdb = tmdbjs.tmdb(apiKey);

    describe('Specific TV show GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all specific GET query methods

        it('Should find details about a TV show.', done => {
        
            // Look for TV show data
            var tvShow = {id: 66732, name: "Stranger Things"};
            
            tmdb.tvShow(tvShow.id).getDetails().then(json => {

                // Assert the results
                assert.equal(json.name, tvShow.name);

                setImmediate(done);
            });
        });
        
        it('Should find swedish details about a TV show.', done => {
        
            // Look for TV show data
            var tvShow = {id: 34, name: "Skenet bedrar"};
            
            var tmdbSwedish = tmdbjs.tmdb(apiKey, "sv-SE");

            tmdbSwedish.tvShow(tvShow.id).getDetails().then(json => {
                // Assert the results
                assert.equal(json.name, tvShow.name);

                setImmediate(done);
            });
        });
    });

    describe('General TV show GET query tests', () => {
        // TODO [David Hall, 2020-06-28]: Test all general GET query methods
    });

    describe('TV show POST query tests', () => {
        // TODO [David Hall, 2020-06-28]: Test all POST query methods
    });
}