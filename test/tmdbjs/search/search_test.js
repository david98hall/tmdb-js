const assert = require('assert');
const tmdbjs = require('../../../src/tmdbjs/tmdbjs');

exports.runTest = apiKey => {

    var tmdb = tmdbjs.tmdb(apiKey);

    describe('Search query tests.', () => {

        // TODO [David Hall, 2020-06-27]: Test all search query methods

        it('Should find multi search data.', done => {
    
            // Perform a multi search
            tmdb.search().multi("Batman").then(pages => {

                // Assert the results
                assert.equal(pages.length, 1);
                var pageJson = pages[0];
                assert.equal(pageJson.page, 1);
                assert.ok(pageJson.total_results > 0);
                assert.ok(pageJson.total_pages > 0);
                assert.ok(pageJson.results.length > 0);

                setImmediate(done);
            });
        });
    
        it('Should find multi search data of several pages.', done => {
    
            // Perform a multi search
            tmdb.search(1, 10).multi("Batman").then(pages => {

                // Assert the results
                assert.ok(pages.length > 1);
                assert.equal(pages[0].page, 1);
                assert.equal(pages[1].page, 2);
                assert.equal(pages[pages.length - 1].page, pages.length);
                assert.ok(pages[0].total_results > 0);
                assert.ok(pages[0].total_pages > 0);
                assert.ok(pages[0].results.length > 0);

                setImmediate(done);
            });
        });
    });

}