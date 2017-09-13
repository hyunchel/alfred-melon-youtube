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
  'https://www.googleapis.com/auth/youtube',
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
        // Refresh access token.
        oauth2Client.refreshAccessToken(() => {
            oauth2Client.setCredentials(tokens);
            store.set('tokens', tokens);
            callback();
        })
    } else {
        console.log('Visit URL:\n', url);
        rl.question('Enter the code here:', function (code) {
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
    }
};

module.exports = {
    oauth2Client,
    getAccessToken,
}