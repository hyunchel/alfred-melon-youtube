const readline = require('readline');
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

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/youtubepartner',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.upload',
];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  // Optional property that passes state parameters to redirect URI
  // state: { foo: 'bar' }
});

const getAccessToken = (oauth2Client, store, callback) => {
    const tokens = store.get('tokens');
    if (tokens) {
        oauth2Client.setCredentials(tokens);
        callback();
    } else {
        console.log('Visit URL:\n', url);
        rl.question('Enter the code here:', function (code) {
            // request access token
            oauth2Client.getToken(code, function (err, tokens) {
                if (err) {
                    return callback(err);
                }
                oauth2Client.setCredentials(tokens);
                store.set('tokens', tokens);
                callback();
            });
        });
    }
};

const getAuthenticated = (store) => {
    return new Promise((resolve, reject) => {
        const cb = (err, resp) => {
            if (err) {
                reject(err);
            }
            resolve(resp);
        }
        getAccessToken(oauth2Client, store, cb);
    })
}

module.exports = {
    oauth2Client,
    getAccessToken,
    getAuthenticated,
}