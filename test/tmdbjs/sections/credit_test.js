const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Credit GET tests', () => {

        let credit = {credit_id: "577da2fac3a36817e1003842", department: "Production"};
        it('Should get credit data.', done => {
            tmdb.getCredits().getCredit(credit.credit_id).getDetails().then(json => {

                // Assert the results
                assert.strictEqual(json.department, credit.department);

                setImmediate(done);
            })
        })

    });
}