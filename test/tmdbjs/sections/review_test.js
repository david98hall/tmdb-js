const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Review GET tests', () => {
        
            var review = {id: "59ac9ea4c3a3682cc80389e0", author: "Reno"};
            it('Should get review data.', done => {
                tmdb.getReviews().getDetails(review.id).then(json => {
                    // Assert the results
                    assert.strictEqual(json.author, review.author);
                
                    setImmediate(done);
                })
            })
    
        });
    }
}