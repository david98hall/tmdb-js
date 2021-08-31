const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];
    let sessionId = authentication["sessionId"];

    let tmdb = new Tmdb(apiKey);

    describe('TV show GET query tests', () => {

        // TODO [David Hall, 2020-06-27]: Test all specific GET query methods

        it('Should find details about a TV show.', done => {

            // Look for TV show data
            let tvShow = {id: 66732, name: "Stranger Things"};

            tmdb.getTvShowSection().getTvShow(tvShow.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, tvShow.name);

                setImmediate(done);
            });
        });

        it('Should find Swedish details about a TV show.', done => {

            // Look for TV show data
            let tvShow = {id: 34, name: "Skenet bedrar"};

            let tmdbSwedish = new Tmdb(apiKey, "sv-SE");

            tmdbSwedish.getTvShowSection().getTvShow(tvShow.id).getDetailsAsync().then(json => {
                // Assert the results
                assert.strictEqual(json.name, tvShow.name);

                setImmediate(done);
            });
        });

        let gotTvShow = {id: 1399, seasonCount: 8, episodeCount: 73};
        let firstGotEpisode = {number: 1, name: "Winter Is Coming"};
        let lastGotEpisode = {number: 73, name: "The Iron Throne"};
        it('Should find all episodes of a TV show', async () => {

            let episodes = await tmdb.getTvShowSection().getTvShow(gotTvShow.id).getAllEpisodesAsync();

            assert.strictEqual(episodes.length, gotTvShow.episodeCount);

            let firstEpisodeDetails = await episodes[firstGotEpisode.number - 1].getDetailsAsync();
            assert.strictEqual(firstEpisodeDetails.name, firstGotEpisode.name);

            let lastEpisodeDetails = await episodes[lastGotEpisode.number - 1].getDetailsAsync();
            assert.strictEqual(lastEpisodeDetails.name, lastGotEpisode.name);
        });

    });

    describe('General TV show GET query tests', () => {
        // TODO [David Hall, 2020-06-28]: Test all general GET query methods

        it('Should find movie certification data.', done => {
            tmdb.getTvShowSection().getCertificationsAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });
    });

    describe('TV show session query tests', () => {

        it('Should rate a TV show and then remove the rating', async () => {

            let tvShow = tmdb.getTvShowSection().getTvShow("1399");
            assert.ok(await tvShow.rateAsync(10, sessionId));
            assert.ok(await tvShow.deleteRatingAsync(sessionId));
        });

        it('Should rate a TV show episode and then remove the rating', async () => {

            let tvShowEpisode = tmdb.getTvShowSection().getTvShow("1399").getEpisode(1, 1);
            assert.ok(await tvShowEpisode.rateAsync(10, sessionId));
            assert.ok(await tvShowEpisode.deleteRatingAsync(sessionId));
        });
    });
}