const {
    playlists,
    playlistItems,
    search,
} = require('../apis/apis');
const {
    getQueries,
    getVideoIds,
    getPlaylistId,
    insertIntoPlaylist,
    deletePlaylist,
} = require('../helpers');

jest.mock('../apis/apis');

test('getVideoIds API call count', () => {
    const data = { queries: [0, 1, 2] };
    search.list.mockClear();
    getVideoIds(data);
    expect(search.list.mock.calls.length).toBe(3);
    expect(search.list.mock.calls[0][0]).toBeDefined();
    expect(search.list.mock.calls[0][1]).toBeDefined();
    expect(search.list.mock.calls[1][0]).toBeDefined();
    expect(search.list.mock.calls[1][1]).toBeDefined();
    expect(search.list.mock.calls[2][0]).toBeDefined();
    expect(search.list.mock.calls[2][1]).toBeDefined();
});

test('getPlaylistId API call count', () => {
    const data = {
        dates: { start: undefined, end: undefined },
        videoIds: [0, 1, 2],
    };
    playlists.list.mockClear();
    // Make this function to return a promise.
    playlists.list = jest.fn()
        .mockReturnValue(new Promise((resolve, reject) => resolve()));

    getPlaylistId(data);
    expect(playlists.list.mock.calls.length).toBe(1);
    expect(playlists.list.mock.calls[0][0]).toBeDefined();
});

test('insertIntoPlaylist API call count', () => {
    const playlistId = 'some playlist ID';
    const videoIds = [0, 1, 2];
    const data = { playlistId, videoIds };
    playlistItems.insert.mockClear();
    insertIntoPlaylist(data);
    setTimeout(() => {
        expect(playlistItems.insert.mock.calls.length).toBe(3);
        expect(playlistItems.insert.mock.calls[0][0]).toBeDefined();
        expect(playlistItems.insert.mock.calls[0][1]).toBeDefined();
        expect(playlistItems.insert.mock.calls[0][2]).toBeDefined();
        expect(playlistItems.insert.mock.calls[1][0]).toBeDefined();
        expect(playlistItems.insert.mock.calls[1][1]).toBeDefined();
        expect(playlistItems.insert.mock.calls[1][2]).toBeDefined();
        expect(playlistItems.insert.mock.calls[2][0]).toBeDefined();
        expect(playlistItems.insert.mock.calls[2][1]).toBeDefined();
        expect(playlistItems.insert.mock.calls[2][2]).toBeDefined();
    }, 500 * 3)
});

test('deletePlaylist API call count', () => {
    const playlistId = 'some playlist ID';
    const data = { playlistId };
    playlists.delete.mockClear();
    deletePlaylist(data);
    expect(playlists.delete.mock.calls.length).toBe(1);
    expect(playlists.delete.mock.calls[0][0]).toBeDefined();
    expect(playlists.delete.mock.calls[0][1]).toBeDefined();
});