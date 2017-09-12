const google = require('googleapis');
const youtube = google.youtube('v3');
const { oauth2Client, authenticate } = require('./auth');

authenticate();

/**
 * API functions
 * doGet, doInsert, doUpdate, doDelete
 */

const doGet = (callback) => {
    const params = {
        auth: oauth2Client,
        part: 'snippet,contentDetails',
        mine: true,
        maxResults: 25,
    };
    youtube.playlists.list(params, callback);
};

const doInsert = (title, description, callback) => {
    const params = {
        auth: oauth2Client,
        part: 'snippet,status',
        resource: {
            snippet: {
                title,
                description,
            },
            status: {
                privacyStatus: 'private',
            }
        }
    };
    youtube.playlists.insert(params, callback);
};

const doUpdate = (playlistId, title, description, callback) => {
    const params = {
        part: 'snippet,status',
        id: playlistId,
        title,
        description,
   };
   youtube.playlists.update(params, callback);
};

const doDelete = (playlistId, callback) => {
    const params = {
        id: playlistId,
   };
   youtube.playlists.delete(params, callback);
};

// FUNCTIONS.
const searchForPlaylist = (title, callback) => {
    doGet(searchForPlaylist(title, callback))
    return ((err, resp) => {
        if (err) {
            return callback(err);
        }
        const items = resp.items.filter(p => p.snippet.title == title);
        if (items.length) {
            const playlistId = items[0].id;
            // FIXME: What is the point of return?
            return doUpdate(playlistId, title, description, callback);
        }
    });
};

/**
 * listPlaylist
 * Lists all playlists.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const listPlaylist = (callback) => {
    doGet(callback);
};

/**
 * insertPlaylist
 * Creates a new playlist with given name and description.
 * @param {string} title A name of playlist to create.
 * @param {string} description A description for new playlist.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const insertPlaylist = (title, description, callback) => {
    doInsert(title, description, callback);
};

/**
 * updatePlaylist
 * Updates a playlist with given title and description.
 * NOTE: Update is performed on the first playlist that matches the given title. 
 * @param {string} queryTitle A title of playlist to update.
 * @param {string} title New title for the playlist.
 * @param {string} description New description for the playlist.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const updatePlaylist = (queryTitle, title, description, callback) => {
    doGet((err, resp) => {
        if (err) {
            return callback(err);
        }
        const items = resp.items.filter(p => p.snippet.title == queryTitle);
        if (items.length) {
            const playlistId = items[0].id;
            // FIXME: What is the point of return?
            return doUpdate(playlistId, title, description, callback);
        }
    });
};

/**
 * deletePlaylist
 * Request Google Youtube API to delete a playlist with given title. 
 * @param {string} title A title of playlist to delete.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const deletePlaylist = (title, callback) => {
    // FIXME: Throws an error saying "a login is required".
    doGet((err, resp) => {
        if (err) {
            return callback(err);
        }
        const items = resp.items.filter(p => p.snippet.title == title);
        if (items.length) {
            const playlistId = items[0].id;
            // FIXME: What is the point of return?
            return doDelete(playlistId, callback);
        }
    });
};


// const callback = (err, resp) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(resp);
// };
// listPlaylist(callback);
// insertPlaylist('bad', 'boy', callback);
// updatePlaylist('bad', 'good', 'boy', callback);
// deletePlaylist('another one', callback);

module.exports = {
    listPlaylist,
    insertPlaylist,
    updatePlaylist,    
    deletePlaylist,
}