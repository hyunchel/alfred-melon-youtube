const { playlistItems } = require('../apis');
const {
    listPlaylistItems,
    insertPlaylistItems,
    updatePlaylistItems,
    deletePlaylistItems,
} = require('../playlistItems');
const KINDS = {
    list: 'youtube#playlistListResponse',
    insert: 'youtube#playlist',
    update: 'youtube#playlistUpdateResponse',
    delete: 'youtube#playlistDeleteResponse',
};

jest.mock('../apis');

test('responds List', () => {
    const playlistId = '';
    const callback = (err, resp) => {};
    playlistItems.list.mockClear();
    listPlaylistItems(playlistId, callback);
    expect(playlistItems.list.mock.calls.length).toBe(1);
    expect(playlistItems.list.mock.calls[0][0]).toBeDefined();
    expect(playlistItems.list.mock.calls[0][1]).toBeDefined();
});

test('responds Insert', () => {
    const title = 'big';
    const description = 'boy';
    const callback = (err, resp) => {};
    playlistItems.insert.mockClear();
    insertPlaylistItems(title, description, callback);
    expect(playlistItems.insert.mock.calls.length).toBe(1);
    expect(playlistItems.insert.mock.calls[0][0]).toBeDefined();
    expect(playlistItems.insert.mock.calls[0][1]).toBeDefined();
});

test('responds Update', () => {
    const oldTitle = 'bad';
    const newTitle = 'good';
    const description = 'boy';
    const callback = (err, resp) => {};
    playlistItems.update.mockClear();
    updatePlaylistItems(oldTitle, newTitle, description, callback);
    expect(playlistItems.update.mock.calls.length).toBe(1);
    expect(playlistItems.update.mock.calls[0][0]).toBeDefined();
    expect(playlistItems.update.mock.calls[0][1]).toBeDefined();
});

test('responds Delete', () => {
    const title = 'good';
    const callback = (err, resp) => {};
    playlistItems.delete.mockClear();
    deletePlaylistItems(title, callback);
    expect(playlistItems.delete.mock.calls.length).toBe(1);
    expect(playlistItems.delete.mock.calls[0][0]).toBeDefined();
    expect(playlistItems.delete.mock.calls[0][1]).toBeDefined();
});