const readJson = require('r-json');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CREDENTIALS = readJson(`${__dirname}/credentials.json`);
const YOUR_CLIENT_ID = CREDENTIALS.installed.client_id;
const YOUR_CLIENT_SECRET = CREDENTIALS.installed.client_secret;
const YOUR_REDIRECT_URL = CREDENTIALS.installed.redirect_uris[0];

var oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL,
);

const scopes = [
  'https://www.googleapis.com/auth/youtube',
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

/**
 * getAccessTokenPromise
 * Authenticates with given code and sets authentication tokens into global config store.
 * @param {object} store An object that contains "config" from Alfy.
 * @param {string} code A string formatted code from Google OAuth2 procedure.
 */
const getAccessTokenPromise = (store, code) => {
    return new Promise((resolve, reject) => {
        const callback = (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        };
        // Reqest access token.
        oauth2Client.getToken(code, function (err, tokens) {
            if (err) {
                return callback(err);
            }
            oauth2Client.setCredentials(tokens);
            store.set('tokens', tokens);
            callback();
        });
    });
};

/**
 * refreshAccessTokenPromise
 * Requests a refresh on authentication token.
 * @param {object} data An object that contains global "store".
 */
const refreshAccessTokenPromise = (data) => {
    oauth2Client.setCredentials(data.store.get('tokens'));
    return new Promise((resolve, reject) => {
        const callback = (err) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        }
        // Refresh access token.
        oauth2Client.refreshAccessToken((err, tokens) => {
            oauth2Client.setCredentials(tokens);
            data.store.set('tokens', tokens);
            callback(err);
        })
    })

};

module.exports = {
    oauth2Client,
    getAccessTokenPromise,
    refreshAccessTokenPromise,
    url,
}