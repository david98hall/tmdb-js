const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const discover = require('../../../src/tmdb-js/sections/types/discover');

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('Discover GET tests', () => {
        
        // TODO [david98hall, 2021-08-15]: Test all GET methods

        it('Should discover movie data.', async () => {

            var discoverSettings = new discover.DiscoverMovieSettings();
            discoverSettings.setPage(2)
            discoverSettings.setSortBy(tmdbUtils.sortingTypes.VOTE_COUNT_ASC);
            discoverSettings.setPrimaryReleaseYear(2017);
            discoverSettings.setWithGenres(80, 28);

            var discoveredMovies = await tmdb.getDiscoverer().discoverMovies(discoverSettings);
            assert.ok(discoveredMovies);
            assert.ok(discoveredMovies.total_results > 0);
        })

        it('Should discover TV show data.', async () => {

            var discoverSettings = new discover.DiscoverTvShowSettings();
            discoverSettings.setPage(1)
            discoverSettings.setSortBy(tmdbUtils.sortingTypes.FIRST_AIR_DATE_DESC);
            discoverSettings.setWithGenres(10765, 80);
            discoverSettings.setWithNetworks(213, 19);
            discoverSettings.setTimezone("America/New_York");

            var discoveredTvShows = await tmdb.getDiscoverer().discoverTvShows(discoverSettings);
            assert.ok(discoveredTvShows);
            assert.ok(discoveredTvShows.total_results > 0);
        })

    });
}