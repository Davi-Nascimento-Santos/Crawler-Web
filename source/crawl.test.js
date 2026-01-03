const {normalizeURL, getURLsFromHTML} = require("./crawl.js"); 
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

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/posts/managers-that-cant-code/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/posts/managers-that-cant-code/"];
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog Part One
            </a>
            <a href="/path2/">
                Boot.dev Blog Part Two
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML invalidURL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})