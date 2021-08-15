const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Company GET tests', () => {
        
            // TODO [david98hall, 2021-08-15]: Test all GET methods

            var company = {id: "1", name: "Lucasfilm Ltd."};
            it('Should get company data.', done => {
                tmdb.getCompanies().getCompany(company.id).getDetails().then(json => {
                    
                    // Assert the results
                    assert.strictEqual(json.name, company.name);
                
                    setImmediate(done);
                })
            })
    
        });
    }
}