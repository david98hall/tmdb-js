const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('People GET query tests', () => {

        let person = {id: "37014", name: "Lauren German", birthday: "1978-11-29"};

        it('Should get detail data.', done => {

            tmdb.getPeopleSection().getPerson(person.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, person.name);
                assert.strictEqual(json.birthday, person.birthday);

                setImmediate(done);
            });
        });

        it("Should get change data about a specific person.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getChangesAsync();

            assert.ok(data);
            assert.ok(data["changes"]);
        });

        it("Should get movie credit data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getMovieCreditsAsync();

            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get TV show credit data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getTvCreditsAsync();

            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get combined credit data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getCombinedCreditsAsync();

            assert.ok(data);
            assert.ok(data["cast"]);
        });

        it("Should get external ID data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getExternalIdsAsync();

            assert.ok(data);
            assert.ok(data["imdb_id"]);
        });

        it("Should get image data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getImagesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get tagged image data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getTaggedImagesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get translation data.", async () => {

            let section = tmdb.getPeopleSection().getPerson(person.id);
            let data = await section.getTranslationsAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get change data.", async () => {

            let section = tmdb.getPeopleSection();
            let data = await section.getChangesAsync();

            assert.ok(data);
            assert.ok(data["results"]);
        });

        it("Should get latest data.", async () => {

            let section = tmdb.getPeopleSection();
            let data = await section.getLatestAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get popular data.", async () => {

            let section = tmdb.getPeopleSection();
            let data = await section.getPopularAsync();

            assert.ok(data);
            assert.ok(data["total_pages"]);
        });
    });
}