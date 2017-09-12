const readline = require('readline');
const readJson = require('r-json');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CREDENTIALS = readJson(`${__dirname}/credentials.json`);
const YOUR_CLIENT_ID = CREDENTIALS.web.client_id;
const YOUR_CLIENT_SECRET = CREDENTIALS.web.client_secret;
// This errors out - check for a ticket.
// const YOUR_REDIRECT_URL = CREDENTIALS.web.redirect_uris;
const YOUR_REDIRECT_URL = CREDENTIALS.web.redirect_uris[0];

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

const getAccessToken = (oauth2Client, callback) => {
    console.log('Visit URL: ', url);
    rl.question('Enter the code here:', function (code) {
        // request access token
        oauth2Client.getToken(code, function (err, tokens) {
            if (err) {
                return callback(err);
            }
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
            callback();
        });
    });
};

/**
 * TEMPORARY!
 */

// getAccessToken(oauth2Client, (err, tokens) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(tokens);
//     console.log(oauth2Client);
// });
// getAccessToken(oauth2Client, listPlaylists);

// Retrieve tokens via token exchange explained above or set them:
const authenticate = () => {
    oauth2Client.setCredentials({
        access_token: 'ya29.GlvEBAE1MyblMvQEtqqcPKKtOHdzup-Dby4kR3tVgadEvri7-L76b58IUVMvww9zakC6caHDNnil9VoTsx6O9sEFUhJLYwYG4SXFaqgwJ3PuznBjxd4nN2xsRyY0',
        refresh_token: '1/4f0x0vHZoeGM-X0ImoR0qUEnghCaVNQeSNMsoZAL9sw'
        // Optional, provide an expiry_date (milliseconds since the Unix Epoch)
        // expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
    });
};

module.exports = {
    oauth2Client,
    authenticate,
}