const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Search query tests.', () => {

        it('Should find data when searching for companies.', done => {
            tmdb.getSearcher()
                .searchCompaniesAsync("Warner")
                .then(assertSearchResultPage);

            setImmediate(done);
        });

        it('Should find data when searching for collections.', done => {
            tmdb.getSearcher()
                .searchCollectionsAsync("Wonder")
                .then(assertSearchResultPage);

            setImmediate(done);
        });

        it('Should find data when searching for keywords.', done => {
            tmdb.getSearcher()
                .searchKeywordsAsync("super")
                .then(assertSearchResultPage);

            setImmediate(done);
        });

        it('Should find data when searching for movies.', done => {
            tmdb.getSearcher()
                .searchMoviesAsync("Spider-Man")
                .then(assertSearchResultPage);

            tmdb.getSearcher()
                .searchMoviesAsync("Jak & Daxter")
                .then(assertSearchResultPage);

            setImmediate(done);
        });

        it('Should find multi search data.', done => {
            tmdb.getSearcher()
                .multiSearchAsync("Batman")
                .then(assertSearchResultPage);

            setImmediate(done);
        });
    
        it('Should find multi search data of several pages.', done => {
            tmdb.getSearcher().multiSearchAsync("Batman", 1, 3).then(pages => {

                // Assert the results
                assert.ok(pages.length > 1);
                assert.strictEqual(pages[0].page, 1);
                assert.strictEqual(pages[1].page, 2);
                assert.strictEqual(pages[pages.length - 1].page, pages.length);
                assert.ok(pages[0]["total_results"] > 0);
                assert.ok(pages[0]["total_pages"] > 0);
                assert.ok(pages[0]["results"].length > 0);

                setImmediate(done);
            });
        });

        it('Should find data when searching for people.', done => {
            tmdb.getSearcher()
                .searchPeopleAsync("Gal")
                .then(assertSearchResultPage);

            setImmediate(done);
        });

        it('Should find data when searching for TV shows.', done => {
            tmdb.getSearcher()
                .searchTvShowsAsync("Walking Dead")
                .then(assertSearchResultPage);

            setImmediate(done);
        });
    });
}

function assertSearchResultPage(pages) {
    assert.strictEqual(pages.length, 1);
    let pageJson = pages[0];
    assert.ok(pageJson);
    assert.strictEqual(pageJson.page, 1);
    assert.ok(pageJson["total_results"] > 0);
    assert.ok(pageJson["total_pages"] > 0);
    assert.ok(pageJson["results"].length > 0);
}