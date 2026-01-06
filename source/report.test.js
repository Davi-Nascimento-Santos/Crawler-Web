const { sortPages} = require('./report');
const {test, expect} = require('@jest/globals');

test('Sorted 2 pages', () => {
    const input = {
        "https://google.com/home/": 2,
        "https://google.com/path/": 1
    };
    const actual = sortPages(input);
    const expected = [
        ["https://google.com/home/", 2],
        ["https://google.com/path/", 1]
    ];
    expect(actual).toEqual(expected);
})


test('Sorted 2 pages', () => {
    const input = {
        "https://google.com/home/": 2,
        "https://google.com/home/path1": 3,
        "https://google.com/home/path2": 5,
        "https://google.com/home/path3": 1,
        "https://google.com/home/path4": 4
    };
    const actual = sortPages(input);
    const expected = [
        ["https://google.com/home/path2", 5],
        ["https://google.com/home/path4", 4],
        ["https://google.com/home/path1", 3],
        ["https://google.com/home/", 2],
        ["https://google.com/home/path3", 1]
    ];
    expect(actual).toEqual(expected);
})