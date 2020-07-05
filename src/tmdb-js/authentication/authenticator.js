const tmdbUtils = require('../../utils/tmdb_utils');
const TmdbApiUser = require('../api/tmdb_api_user').TmdbApiUser;

/**
 * A module containing authentication methods.
 * @module
 */

 /**
  * Handles authentication methods of TMDB.
  * @param {string} apiKey 
  */
 exports.Authenticator = class extends TmdbApiUser {

   /**
    * Sets properties.
    * @param {string} apiKey The TMDB API key.
    */
   constructor(apiKey) {
      super(apiKey);
   }

   /**
    * Creates a session. This will open a tab in the specified web browser, where the 
    * end-user will have to approve the request token and thereafter get a session ID.
    * @param {string} permissionApp 
    * The name of the web browser app that the end-user will use to approve the request token.
    * The default value is "chrome".
    * @returns A Promise of a session ID.
    */
   createSession(permissionApp = "chrome") { 
      return tmdbUtils.createSession(apiKey, permissionApp);
   }

   /**
    * Creates a guest session.
    * @returns A Promise of a guest session ID.
    */
   createGuestSession() {
      return tmdbUtils.createGuestSession(apiKey);
   }

   /**
    * Deletes (log outs from) a session.
    * @param {string} sessionId The ID of the session that will be deleted.
    * @returns A Promise of a boolean value, which will be true if the deletion is successful. 
    */
   deleteSession(sessionId) {
      return tmdbUtils.deleteSession(apiKey, sessionId);
   }
}