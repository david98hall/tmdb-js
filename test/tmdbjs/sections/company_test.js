const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Company GET tests', () => {

        // TODO [david98hall, 2021-08-15]: Test all GET methods

        let company = {id: "1", name: "Lucasfilm Ltd."};
        it('Should get company data.', done => {
            tmdb.getCompanies().getCompany(company.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, company.name);

                setImmediate(done);
            })
        })

    });
}