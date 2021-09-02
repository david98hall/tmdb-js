const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Company GET tests', () => {

        // TODO [david98hall, 2021-08-15]: Test all GET methods

        let company = {id: "1", name: "Lucasfilm Ltd."};
        it('Should get detail data.', done => {
            tmdb.getCompanySection().getCompany(company.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.ok(json);
                assert.strictEqual(json.name, company.name);

                setImmediate(done);
            });
        });

        it("Should get alternative name data.", async () => {
            let data = await tmdb.getCompanySection().getCompany(company.id).getAlternativeNamesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get image data.", async () => {
            let data = await tmdb.getCompanySection().getCompany(company.id).getImagesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });
    });
}