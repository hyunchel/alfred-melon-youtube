const alfy = require('alfy');
const {
    getQueries,
    getVideoIds,
    getPlaylistId,
    insertIntoPlaylist,
} = require('./helpers');

const date = '2017/09/12';
const cutLine = 10;
getQueries(date, cutLine)
    .then(getVideoIds)
    .then(getPlaylistId)
    .then(insertIntoPlaylist)
    .catch(err => console.log(err));