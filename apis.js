const google = require('googleapis');
const youtube = google.youtube('v3');
const { oauth2Client, authenticate } = require('./auth');

authenticate();

const search = {
   list(query, callaback) {
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
        youtube.search.list(requestOptions, callback);
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
        youtube.playlists.list(requestOptions, callback);
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
        youtube.playlists.insert(requestOptions, callback);
    },

    update(playlistId, title, description, callback) {
        const requestOptions = {
            part: 'snippet,status',
            id: playlistId,
            title,
            description,
        };
        youtube.playlists.update(requestOptions, callback);
    },

    delete(playlistId, callback) {
        const requestOptions = {
            id: playlistId,
        };
        youtube.playlists.delete(requestOptions, callback);
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
        youtube.playlistItems.list(requestOptions, callback);
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
        youtube.playlistItems.insert(requestOptions, callback);
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
        youtube.playlistItems.update(requestOptions, callback);

    },

    delete(playlistItemId, callback) {
        const requestOptions = {
            auth: oauth2Client,
            id: playlistItemId,
        };
        youtube.playlistItems.delete(requestOptions, callback);
    },
};

module.exports = {
    search,
    playlists,
    playlistItems,
}