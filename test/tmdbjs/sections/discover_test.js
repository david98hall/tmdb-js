const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const discover = require('../../../src/tmdb-js/sections/types/discover');

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Discover GET tests', () => {

        // TODO [david98hall, 2021-08-15]: Test all GET methods

        it('Should discover movie data.', async () => {

            let discoverSettings = new discover.DiscoverMovieSettings();
            discoverSettings.setPage(2)
            discoverSettings.setSortBy(tmdbUtils.sortingTypes.VOTE_COUNT_ASC);
            discoverSettings.setPrimaryReleaseYear(2017);
            discoverSettings.setWithGenres("80", "28");

            let discoveredMovies = await tmdb.getDiscoverSection().discoverMoviesAsync(discoverSettings);
            assert.ok(discoveredMovies);
            assert.ok(discoveredMovies["total_results"] > 0);
        });

        it('Should discover TV show data.', async () => {

            let discoverSettings = new discover.DiscoverTvShowSettings();
            discoverSettings.setPage(1)
            discoverSettings.setSortBy(tmdbUtils.sortingTypes.FIRST_AIR_DATE_DESC);
            discoverSettings.setWithGenres("10765", "80");
            discoverSettings.setWithNetworks("213", "19");
            discoverSettings.setTimezone("America/New_York");

            let discoveredTvShows = await tmdb.getDiscoverSection().discoverTvShowsAsync(discoverSettings);
            assert.ok(discoveredTvShows);
            assert.ok(discoveredTvShows["total_results"] > 0);
        });
    });
}