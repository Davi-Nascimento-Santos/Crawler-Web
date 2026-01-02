const {normalizeURL, getURLsFromHTML} = require("./normalizeURL.js"); 
const {expect, test} = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://google.com/home';
    const actual = normalizeURL(input);
    const expected = 'google.com/home';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://google.com/home/';
    const actual = normalizeURL(input);
    const expected = 'google.com/home';
    expect(actual).toEqual(expected);
})

test('normalizeURL capitals', () => {
    const input = 'https://GOOGLE.com/';
    const actual = normalizeURL(input);
    const expected = 'google.com';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip http', () => {
    const input = 'http://google.com/';
    const actual = normalizeURL(input);
    const expected = 'google.com';
    expect(actual).toEqual(expected);
})
