const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbTestUtils = require('../utils/tmdb_test_utils');

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('TV show GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all specific GET query methods

        it('Should find details about a TV show.', done => {
        
            // Look for TV show data
            var tvShow = {id: 66732, name: "Stranger Things"};
            
            tmdb.getTvShows().getTvShow(tvShow.id).getDetails().then(json => {

                // Assert the results
                assert.strictEqual(json.name, tvShow.name);

                setImmediate(done);
            });
        });
        
        it('Should find Swedish details about a TV show.', done => {
        
            // Look for TV show data
            var tvShow = {id: 34, name: "Skenet bedrar"};
            
            var tmdbSwedish = new Tmdb(apiKey, "sv-SE");

            tmdbSwedish.getTvShows().getTvShow(tvShow.id).getDetails().then(json => {
                // Assert the results
                assert.strictEqual(json.name, tvShow.name);

                setImmediate(done);
            });
        });

        var gotTvShow = { id: 1399, seasonCount: 8, episodeCount: 73 };
        var firstGotEpisode = { number: 1, name: "Winter Is Coming"};
        var lastGotEpisode = { number: 73, name: "The Iron Throne"};
        it('Should find all episodes of a TV show', async () => {
            
            var episodes = await tmdb.getTvShows().getTvShow(gotTvShow.id).getAllEpisodes();

            assert.strictEqual(episodes.length, gotTvShow.episodeCount);

            var firstEpisodeDetails = await episodes[firstGotEpisode.number - 1].getDetails();
            assert.strictEqual(firstEpisodeDetails.name, firstGotEpisode.name);

            var lastEpisodeDetails = await episodes[lastGotEpisode.number - 1].getDetails();
            assert.strictEqual(lastEpisodeDetails.name, lastGotEpisode.name);
        });

    });

    describe('General TV show GET query tests', () => {
        // TODO [David Hall, 2020-06-28]: Test all general GET query methods

        it('Should find movie certification data.', done => {
            tmdb.getTvShows().getCertifications().then(json => {
                
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            });
        });
    });

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('TV show session query tests', () => {
        
            it('Should rate and unrate a TV show', async () => {
                var sessionId = await tmdbTestUtils.getSessionId();
                assert.ok(sessionId);

                var tvShow = tmdb.getTvShows().getTvShow(1399);
                assert.ok(await tvShow.rate(10, sessionId));
                assert.ok(await tvShow.deleteRating(sessionId));
            });
    
            it('Should rate and unrate a TV show episode', async () => {
                var sessionId = await tmdbTestUtils.getSessionId();
                assert.ok(sessionId);

                var tvShowEpisode = tmdb.getTvShows().getTvShow(1399).getEpisode(1, 1);
                assert.ok(await tvShowEpisode.rate(10, sessionId));
                assert.ok(await tvShowEpisode.deleteRating(sessionId));
            });

        });
    }
}