const google = require('googleapis');
const youtube = google.youtube('v3');
const { oauth2Client, authenticate } = require('./auth');

authenticate();

const doGet = (playlistId, callback) => {
    const requestOptions = {
        auth: oauth2Client,
        playlistId,
        part: 'snippet',
        maxResults: 10
    };
    youtube.playlistItems.list(requestOptions, callback);
};

const doInsert = (playlistId, videoId, callback) => {
    const requestOptions = {
        auth: oauth2Client,
        playlistId: playlistId,
        part: 'snippet',
        resource: {
            snippet: {
                playlistId,
                resourceId: {
                    kind: 'youtube#video',
                    videoId,
                },
            },
        },
    };
    youtube.playlistItems.insert(requestOptions, callback);

};

const doUpdate = (playlistId, playlistItemId, videoId, position, callback) => {
    const requestOptions = {
        auth: oauth2Client,
        part: 'snippet',
        resource: {
            id: playlistItemId,
            snippet: {
                playlistId,
                resourceId: {
                    kind: 'youtube#video',
                    videoId,
                    position,
                }
            }
        },
    };
    youtube.playlistItems.update(requestOptions, callback);

};

const doDelete = (playlistItemId, callback) => {
    const requestOptions = {
        auth: oauth2Client,
        id: playlistItemId,
    };
    youtube.playlistItems.delete(requestOptions, callback);
};


// FUNCTIONS.

/**
 * listPlaylistItems
 * Fetches all items listed in the playlist.
 * @param {string} playlistId An ID of a playlist to fetch.
 * @param {function} callback A callback function to run after the playlist is fetched.
 */
const listPlaylistItems = (playlistId, callback) => {
    doGet(playlistId, callback);
};

/**
 * insertPlaylistItems
 * Inserts a new item to the playlist. 
 * @param {string} playlistId An ID for a playlist to insert.
 * @param {string} videoId Video ID of a new item for the playlist.
 * @param {function} callback A callback function to run after the item is inserted.
 */
const insertPlaylistItems = (playlistId, videoId, callback) => {
    doInsert(playlistId, videoId, callback);
};

/**
 * updatePlaylistItems
 * Modifies a position of an item in the playlist.
 * @param {string} playlistId An ID for a playlist to modify.
 * @param {string} playlistItemId An ID for an item in the specified playlist.
 * @param {string} videoId Video ID of the item in the playlist.
 * @param {string} position An index of the item in the playlist.
 * @param {function} callback A callback function to run after the playlist is updated.
 */
const updatePlaylistItems = (playlistId, playlistItemId, videoId, position, callback) => {
    doUpdate(playlistId, playlistItemId, videoId, position, callback);
};

/**
 * deletePlaylistItems
 * Removes an item from the playlist.
 * @param {string} playlistItemId An ID for an item in the playlist.
 * @param {function} callback A callback function to run after the item is deleted.
 */
const deletePlaylistItems = (playlistItemId, callback) => {
    doDelete(playlistItemId, callback);
};


const playlistId = 'PL6h_IKnSc0QmE_IZ-9B8yIuy-M7fvChO6';
const callback = (err, resp) => {
    if (err) {
        return console.error(err);
    }
    console.log(resp);
};
listPlaylistItems(playlistId, callback);
const videoId = 'M7FIvfx5J10';
// insertPlaylistItems(playlistId, videoId, callback);
const position = 0;
const playlistItemId = 'UEw2aF9JS25TYzBRbUVfSVotOUI4eUl1eS1NN2Z2Q2hPNi41NkI0NEY2RDEwNTU3Q0M2';
// const newVideoId = 'DhCgYgsv8bw';
// updatePlaylistItems(playlistId, playlistItemId, videoId, position, callback);

// deletePlaylistItems(playlistItemId, callback);

module.exports = {
    listPlaylistItems,
    insertPlaylistItems,
    updatePlaylistItems,
    deletePlaylistItems,
}