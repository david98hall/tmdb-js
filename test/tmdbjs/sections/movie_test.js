const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];
    let sessionId = authentication["sessionId"];

    let tmdb = new Tmdb(apiKey);

    describe('Movie GET query tests', () => {

        let madMaxMovie = {id: 76341, title: "Mad Max: Fury Road"};

        it('Should find data about a movie.', done => {
            tmdb.getMovieSection().getMovie(madMaxMovie.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.ok(json);
                assert.strictEqual(json.title, madMaxMovie.title);
                assert.ok(!json.hasOwnProperty("videos"));
                assert.ok(!json.hasOwnProperty("images"));

                setImmediate(done);
            });
        });

        it('Should find data about a movie with "Append to Response".', done => {

            tmdb.getMovieSection().getMovie(madMaxMovie.id).getDetailsAsync("videos", "images").then(json => {

                // Assert the results
                assert.ok(json);
                assert.ok(json.hasOwnProperty("videos"));
                assert.ok(json.hasOwnProperty("images"));

                setImmediate(done);
            });
        });

        it("Should get account state data.", async () => {
            let data = await tmdb.getMovieSection()
                .getMovie(madMaxMovie.id)
                .getAccountStatesAsync(sessionId);
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get alternative name data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getAlternativeTitlesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get change data for a specific movie.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getChangesAsync();
            assert.ok(data);
            assert.ok(data["changes"]);
        });

        it('Should find movie credit data.', async () => {
            let data = await tmdb.getMovieSection().getMovie(madMaxMovie.id).getCreditsAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get external ID data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getExternalIdsAsync();
            assert.ok(data);
            assert.ok(data["imdb_id"]);
        });

        it("Should get image data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getImagesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get keyword data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getKeywordsAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get release date data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getReleaseDatesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get video data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getVideosAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get translation data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getTranslationsAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get recommendation data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getRecommendationsAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get similar movie data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getSimilarMoviesAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get review data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getReviewsAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get list data.", async () => {
            let movie = tmdb.getMovieSection().getMovie(madMaxMovie.id);
            let data = await movie.getListsAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get change data.", async () => {
            let data = await tmdb.getMovieSection().getChangesAsync();
            assert.ok(data);
            assert.ok(data["results"]);
        });

        it("Should get latest movie data.", async () => {
            let data = await tmdb.getMovieSection().getLatestAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get now playing data.", async () => {
            let data = await tmdb.getMovieSection().getNowPlayingAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get popular data.", async () => {
            let data = await tmdb.getMovieSection().getPopularAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get top rated data.", async () => {
            let data = await tmdb.getMovieSection().getTopRatedAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it("Should get upcoming data.", async () => {
            let data = await tmdb.getMovieSection().getUpcomingAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find movie certification data.', done => {
            tmdb.getMovieSection().getCertificationsAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });
    });

    describe('Movie session query tests', () => {

        it('Should rate a movie and then remove the rating', async () => {

            let movie = tmdb.getMovieSection().getMovie("16869");
            assert.ok(await movie.rateAsync(10, sessionId));
            assert.ok(await movie.deleteRatingAsync(sessionId));
        });
    });
}