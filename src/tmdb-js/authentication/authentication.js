/**@module tmdb-js/authentication */

const tmdbUtils = require('../../utils/tmdb_utils');
const TmdbApiUser = require('../api/tmdb_api_user').TmdbApiUser;

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
    * The default value is undefined. An example of a valid value is "chrome".
    * @returns A Promise of a session ID string.
    */
   async createSessionAsync(permissionApp = undefined) {
      return await tmdbUtils.createSessionAsync(this._apiKey, permissionApp);
   }

   /**
    * Creates a guest session.
    * @returns A Promise of a guest session ID.
    */
   async createGuestSessionAsync() {
      return await tmdbUtils.createGuestSessionAsync(this._apiKey);
   }

   /**
    * Deletes (log outs from) a session.
    * @param {string} sessionId The ID of the session that will be deleted.
    * @returns A Promise of a boolean value, which will be true if the deletion is successful. 
    */
   async deleteSessionAsync(sessionId) {
      return tmdbUtils.deleteSessionAsync(this._apiKey, sessionId);
   }
}