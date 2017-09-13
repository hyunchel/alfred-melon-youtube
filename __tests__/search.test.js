const { search } = require('../apis/apis');
const { searchVideos } = require('../apis/search');
const KINDS = {
    list: 'youtube#searchListResponse',
};

jest.mock('../apis/apis');

test('responds List', () => {
    const query = 'Jisung Park';
    const callback = (err, resp) => {};
    searchVideos(query, callback);
    expect(search.list.mock.calls.length).toBe(1);
    expect(search.list.mock.calls[0][0]).toBeDefined();
    expect(search.list.mock.calls[0][1]).toBeDefined();
});