const { playlists } = require('./apis');

/**
 * listPlaylist
 * Lists all playlists.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const listPlaylist = (callback) => {
    playlists.list(callback);
};

/**
 * insertPlaylist
 * Creates a new playlist with given name and description.
 * @param {string} title A name of playlist to create.
 * @param {string} description A description for new playlist.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const insertPlaylist = (title, description, callback) => {
    playlists.insert(title, description, callback);
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
const updatePlaylist = (playlistId, title, description, callback) => {
    playlists.update(playlistId, title, description, callback);
};

/**
 * deletePlaylist
 * Request Google Youtube API to delete a playlist with given title. 
 * @param {string} title A title of playlist to delete.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const deletePlaylist = (playlistId, callback) => {
    playlists.delete(playlistId, callback);
};

const searchForPlaylist = (title, callback) => {
    playlists.list(searchForPlaylist(title, callback))
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

module.exports = {
    listPlaylist,
    insertPlaylist,
    updatePlaylist,    
    deletePlaylist,
}