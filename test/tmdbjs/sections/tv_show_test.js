const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];
    let sessionId = authentication["sessionId"];

    let tmdb = new Tmdb(apiKey);

    describe('TV show GET query tests', () => {

        it('Should find details about a TV show.', done => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            tmdb.getTvShowSection().getTvShow(tvShow.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, tvShow.name);

                setImmediate(done);
            });
        });

        it('Should find Swedish details about a TV show.', done => {

            let tvShow = {id: "34", name: "Skenet bedrar"};
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

        it("Should get aggregate credit data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getAggregateCreditsAsync();

            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get alternative title data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getAlternativeTitlesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get change data for a specific TV show.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getChangesAsync();

            assert.ok(data);
            assert.ok(data["changes"]);
        });

        it("Should get content rating data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getContentRatingsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get credit data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getCreditsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get episode group data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getEpisodeGroupDataAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get external id data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getExternalIdsAsync();

            assert.ok(data);
            assert.ok(data["imdb_id"]);
        });

        it("Should get image data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getImagesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get keyword data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getKeywordsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get recommendation data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getRecommendationsAsync();

            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get review data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getReviewsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get screened theatrically data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getScreenedTheatricallyAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get similar TV show data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getSimilarTvShowsAsync();

            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get translation data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getTranslationsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get video data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getVideosAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get content rating data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getContentRatingsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });
    });

    describe("TV Show Season tests", () => {

        let gotTvShow = {id: 1399, seasonCount: 8, episodeCount: 73};

        it("Should get detail data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getDetailsAsync();

            assert.ok(data);
            assert.ok(data["air_date"]);
        });

        it("Should get aggregate credit data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getAggregateCreditsAsync();

            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get change data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getChangesAsync();
            assert.ok(data);
            assert.ok(data["changes"]);
        });

        it("Should get credit data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getCreditsAsync();

            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get external ID data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getExternalIdsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get image data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getImagesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get translation data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getTranslationsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get image data.", async () => {
            let section = tmdb.getTvShowSection().getTvShow(gotTvShow.id).getSeason(1);
            let data = await section.getVideosAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });
    });

    describe("TV Show Episode tests", () => {

        it("Should get detail data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getDetailsAsync();
            assert.ok(data);
            assert.ok(data["air_date"]);
        });

        it("Should get change data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getChangesAsync();
            assert.ok(data);
            assert.ok(data["changes"]);
        });

        it("Should get credit data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getCreditsAsync();
            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get external ID data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getExternalIdsAsync();
            assert.ok(data);
            assert.ok(data["imdb_id"]);
        });

        it("Should get image data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getImagesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get translation data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getTranslationsAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get video data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getVideosAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });
    });

    describe('General TV show GET query tests', () => {

        it('Should get latest TV show data.', async () => {
            let data = await tmdb.getTvShowSection().getLatestAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it('Should get TV airing today data.', async () => {
            let data = await tmdb.getTvShowSection().getTvAiringTodayAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should get TV on the air TV show data.', async () => {
            let data = await tmdb.getTvShowSection().getTvOnTheAirAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should get popular data.', async () => {
            let data = await tmdb.getTvShowSection().getPopularAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should get top rated data.', async () => {
            let data = await tmdb.getTvShowSection().getTopRatedAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should get episode group data.', async () => {
            const episodeGroupId = "5af83d88c3a3682ac8007b28";
            let section = tmdb.getTvShowSection().getTvShowEpisodeGroup(episodeGroupId);
            let data = await section.getDetailsAsync();
            assert.ok(data);
            assert.ok(data["group_count"]);
        });

        it('Should find movie certification data.', async () => {
            let data = await tmdb.getTvShowSection().getCertificationsAsync();
            assert.ok(data);
            assert.ok(data["certifications"]);
        });
    });

    describe('TV show session query tests', () => {

        it("Should get TV show account state data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id);
            let data = await section.getAccountStatesAsync(sessionId);

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get TV show season account state data.", async () => {

            let tvShow = {id: "66732", name: "Stranger Things"};

            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getSeason(1);
            let data = await section.getAccountStatesAsync(sessionId);

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get TV show episode account state data.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);
            let data = await section.getAccountStatesAsync(sessionId);
            assert.ok(data);
            assert.ok(data["id"]);
        });

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

        it("Should rate a TV show episode and then remove the rating.", async () => {
            const tvShow = {id: "66732", name: "Stranger Things"};
            let section = tmdb.getTvShowSection().getTvShow(tvShow.id).getEpisode(1, 1);

            assert.ok(await section.rateAsync(10, sessionId));
            assert.ok(await section.deleteRatingAsync(sessionId));
        });
    });
}