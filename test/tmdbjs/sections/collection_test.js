const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = apiKey => {

    let tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Collection GET tests', () => {
        
            let collection = {id: 304, name: "Ocean's Collection"};
            it('Should get collection data.', done => {
                tmdb.getCollections().getCollection(collection.id).getDetails().then(json => {
                    
                    // Assert the results
                    assert.strictEqual(json.name, collection.name);
                
                    setImmediate(done);
                })
            })
    
        });
    }
}