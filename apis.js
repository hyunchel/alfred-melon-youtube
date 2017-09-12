const google = require('googleapis');
const youtube = google.youtube('v3');
const { oauth2Client, authenticate } = require('./auth');

authenticate();

const search = {
   list(query, callback) {
        /**
         * FIXME: Must add the following options near future:
         * topicId (for music)
         * publishedAfter
         * order
         * regionCode 
         * location
         */
        const requestOptions = {
            auth: oauth2Client,
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: 10,
        };
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.search.list(requestOptions, cb);
        });
   },
};

const playlists = {
    list(callback) {
        const requestOptions = {
            auth: oauth2Client,
            part: 'snippet,contentDetails',
            mine: true,
            maxResults: 25,
        };
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlists.list(requestOptions, cb);
        });
    },

    insert(title, description, callback) {
        const requestOptions = {
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
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlists.insert(requestOptions, cb);
        });
    },

    update(playlistId, title, description, callback) {
        const requestOptions = {
            part: 'snippet,status',
            id: playlistId,
            title,
            description,
        };
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlists.update(requestOptions, cb);
        });
    },

    delete(playlistId, callback) {
        const requestOptions = {
            id: playlistId,
        };
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlists.delete(requestOptions, cb);
        });
    },
};

const playlistItems = {
    list(playlistId, callback) {
        const requestOptions = {
            auth: oauth2Client,
            playlistId,
            part: 'snippet',
            maxResults: 10
        };
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlistItems.list(requestOptions, cb);
        });
    },

    insert(playlistId, videoId, callback) {
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
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlistItems.insert(requestOptions, cb);
        });
    },

    update(playlistId, playlistItemId, videoId, position, callback) {
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
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlistItems.update(requestOptions, cb);
        });

    },

    delete(playlistItemId, callback) {
        const requestOptions = {
            auth: oauth2Client,
            id: playlistItemId,
        };
        return new Promise((resolve, reject) => {
            const cb = (err, resp) => {
                if (err) {
                    reject(err);
                }
                resolve(callback(err, resp))
            };
            youtube.playlistItems.delete(requestOptions, cb);
        });
    },
};

module.exports = {
    search,
    playlists,
    playlistItems,
}