const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
// const tmdbTestUtils = require('../utils/tmdb_test_utils');

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('TV show GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all specific GET query methods

        it('Should find details about a TV show.', done => {
        
            // Look for TV show data
            var tvShow = {id: 66732, name: "Stranger Things"};
            
            tmdb.getTvShows().getTvShow(tvShow.id).getDetails().then(json => {

                // Assert the results
                assert.equal(json.name, tvShow.name);

                setImmediate(done);
            });
        });
        
        it('Should find swedish details about a TV show.', done => {
        
            // Look for TV show data
            var tvShow = {id: 34, name: "Skenet bedrar"};
            
            var tmdbSwedish = new Tmdb(apiKey, "sv-SE");

            tmdbSwedish.getTvShows().getTvShow(tvShow.id).getDetails().then(json => {
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