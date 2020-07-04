const assert = require('assert');
const tmdbjs = require('../../../src/tmdbjs/tmdbjs');
const tmdb_utils = require('../../../src/utils/tmdb_utils');
const tmdb_test_utils = require('./tmdb_test_utils');

exports.runTest = apiKey => {

    const tmdb = tmdbjs.tmdb(apiKey);

    describe('TMDB Utility Function Tests', () => {

        it('Should get a request token', async () => {
            const token = await tmdb_utils.getRequestToken(apiKey);
            assert.ok(token);
        });

        // Not deterministic, don't run in CI
        if (!process.env.CI) {
            
            xit('Should create a session without login.', async () => {
                
                // Create a session
                const sessionId = await tmdb_utils.createSession(apiKey);
                assert.ok(sessionId);
    
                // Delete the session
                assert.ok(await tmdb_utils.deleteSession(apiKey, sessionId));
            }).timeout(15000);
    
            // Avoid creating guest sessions since they can't be deleted (it seems)
            xit('Should create a guest session.', async () => {
                const guestSessionID = await tmdb_utils.createGuestSession(apiKey);
                assert.ok(guestSessionID);
    
                // assert.ok(await tmdb_utils.deleteSession(apiKey, guestSessionID));
            });
    
            xit('Should create a session with login.', async () => {
                const loginInfo = await tmdb_test_utils.getLoginInformation();
                const success = await tmdb_utils.createLoginSession(apiKey, loginInfo.username, loginInfo.password);
                assert.ok(success);
            });
        }
    })
};