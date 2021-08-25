const assert = require('assert');
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const tmdbTestUtils = require('./tmdb_test_utils');

exports.runTest = apiKey => {

    describe('TMDB Utility Function Tests', () => {

        it('Should get a request token', async () => {
            const token = await tmdbUtils.getRequestTokenAsync(apiKey);
            assert.ok(token);
        });

        // Not deterministic, don't run in CI
        if (!process.env.CI) {
            
            xit('Should create a session without login.', async () => {
                
                // Create a session
                const sessionId = await tmdbUtils.createSessionAsync(apiKey);
                assert.ok(sessionId);
    
                // Delete the session
                assert.ok(await tmdbUtils.deleteSessionAsync(apiKey, sessionId));
            }).timeout(15000);
    
            // Avoid creating guest sessions since they can't be deleted (it seems)
            xit('Should create a guest session.', async () => {
                const guestSessionID = await tmdbUtils.createGuestSessionAsync(apiKey);
                assert.ok(guestSessionID);
    
                // assert.ok(await tmdb_utils.deleteSession(apiKey, guestSessionID));
            });
    
            xit('Should create a session with login.', async () => {
                const loginInfo = await tmdbTestUtils.getLoginInformationAsync();
                const success = await tmdbUtils.createLoginSessionAsync(apiKey, loginInfo.username, loginInfo.password);
                assert.ok(success);
            });
        }
    })
};