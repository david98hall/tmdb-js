const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Credit GET tests', () => {

        let credit = {credit_id: "577da2fac3a36817e1003842", department: "Production"};
        it('Should get credit data.', done => {
            tmdb.getCredits().getCredit(credit.credit_id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.department, credit.department);

                setImmediate(done);
            })
        })

    });
}