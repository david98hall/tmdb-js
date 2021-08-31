const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Review GET tests', () => {

        let review = {id: "59ac9ea4c3a3682cc80389e0", author: "Reno"};
        it('Should get review data.', done => {
            tmdb.getReviewSection().getReview(review.id).getDetailsAsync().then(json => {
                // Assert the results
                assert.strictEqual(json.author, review.author);

                setImmediate(done);
            });
        })
    });
}