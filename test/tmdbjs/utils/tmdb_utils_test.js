const assert = require('assert');
const tmdb_utils = require('../../../src/utils/tmdb_utils');
const tmdb_test_utils = require('./tmdb_test_utils');

exports.runTest = apiKey => {

    describe('TMDB Utility Function Tests', () => {

        it('Should get a request token', async () => {
            const token = await tmdb_utils.getRequestToken(apiKey);
            assert.ok(token);
        });

        // Cannot be run on CI, but succeeds locally
        xit('Should get login information', async () => {
            const loginInfo = await tmdb_test_utils.getLoginInformation();
            assert.ok(loginInfo);
            assert.ok(loginInfo.username);
            assert.ok(loginInfo.password);
        });

        // Cannot be run on CI, but succeeds locally
        xit('Should create a session without login.', async () => {
            const success = await tmdb_utils.createSession(apiKey);
            assert.ok(success);
        }).timeout(15000);

        // Cannot be run on CI, but succeeds locally
        xit('Should create a session with login.', async () => {
            const loginInfo = await tmdb_test_utils.getLoginInformation();
            const success = await tmdb_utils.createLoginSession(apiKey, loginInfo.username, loginInfo.password);
            assert.ok(success);
        }).timeout(15000);
    })
};