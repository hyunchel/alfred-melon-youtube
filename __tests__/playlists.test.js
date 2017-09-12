const { playlists } = require('../apis');
const {
    listPlaylist,
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
} = require('../playlists');
const KINDS = {
    list: 'youtube#playlistListResponse',
    insert: 'youtube#playlist',
    update: 'youtube#playlistUpdateResponse',
    delete: 'youtube#playlistDeleteResponse',
};

jest.mock('../apis');

test('responds List', () => {
    const callback = (err, resp) => {};
    playlists.list.mockClear();
    listPlaylist(callback);
    expect(playlists.list.mock.calls.length).toBe(1);
    expect(playlists.list.mock.calls[0][0]).toBeDefined();
});

test('responds Insert', () => {
    const title = 'some title';
    const description = 'some description';
    const callback = (err, resp) => {};
    playlists.insert.mockClear();
    insertPlaylist(title, description, callback);
    expect(playlists.insert.mock.calls.length).toBe(1);
    expect(playlists.insert.mock.calls[0][0]).toBeDefined();
    expect(playlists.insert.mock.calls[0][1]).toBeDefined();
    expect(playlists.insert.mock.calls[0][2]).toBeDefined();
});

test('responds Update', () => {
    const playlistId = 'some playlist ID';
    const title = 'some title';
    const description = 'some description';
    const callback = (err, resp) => {};
    playlists.update.mockClear();
    updatePlaylist(playlistId, title, description, callback);
    expect(playlists.update.mock.calls.length).toBe(1);
    expect(playlists.update.mock.calls[0][0]).toBeDefined();
    expect(playlists.update.mock.calls[0][1]).toBeDefined();
    expect(playlists.update.mock.calls[0][2]).toBeDefined();
    expect(playlists.update.mock.calls[0][3]).toBeDefined();
});

test('responds Delete', () => {
    const playlistId = 'some playlist ID';
    const callback = (err, resp) => {};
    playlists.delete.mockClear();
    deletePlaylist(playlistId, callback);
    expect(playlists.delete.mock.calls.length).toBe(1);
    expect(playlists.delete.mock.calls[0][0]).toBeDefined();
    expect(playlists.delete.mock.calls[0][1]).toBeDefined();
});