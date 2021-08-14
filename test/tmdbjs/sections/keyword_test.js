const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Keyword GET tests', () => {
        
            var keyword = {id: "14999", name: "devil"};
            it('Should get keyword data.', done => {
                tmdb.getKeywords().getKeyword(keyword.id).getDetails().then(json => {

                    // Assert the results
                    assert.strictEqual(json.name, keyword.name);
                
                    setImmediate(done);
                })
            })
    
        });
    }
}