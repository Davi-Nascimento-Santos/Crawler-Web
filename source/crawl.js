const {JSDOM} = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }
    const normalizeCurrentURl = normalizeURL(currentURL);
    if (pages[normalizeCurrentURl] > 0){
        pages[normalizeCurrentURl]++;
        return pages;
    }
    pages[normalizeCurrentURl] = 1;
    try{
        const data = await fetch(currentURL);
        console.log(`Starting crawling on ${currentURL}`)
        if (data.headers.get('content-type').includes('text/html')){
            const html = await data.text();
            const urls = getURLsFromHTML(html, baseURL);
            for(const url of urls){
                pages = await crawlPage(baseURL, url, pages);
            }
        }else{
            console.log(`Error: no HTML response, content-type: ${data.headers.get('content-type')}, on ${currentURL}`);
            return pages;
        }
    }catch(err){
        console.log(`Error, message: ${err} on ${currentURL}`)
        return pages;
    }
    return pages;

}

function getURLsFromHTML(html, baseURL){
    const dom = new JSDOM(html);
    const as = dom.window.document.querySelectorAll('a');
    const urls = [];
    for (const a of as){
        if (!a.href) continue
        const isRelative = a.href.startsWith('/');
        const isAbsolute = a.href.startsWith('http://') || a.href.startsWith('https://');
        if (!isRelative && !isAbsolute) continue;
        try{
            const urlObj = new URL(a.href, baseURL);
            if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:'){
                urls.push(`${urlObj.href}`)
            }
        }catch(err){
            console.log(`Invalid URL`)
        }
    }
    return urls;
}

function normalizeURL(url){
    const urlObj = new URL(url);
    const fullURL = `${urlObj.hostname}${urlObj.pathname}`;
    if (fullURL.slice(-1) === '/'){
        return fullURL.slice(0, -1);
    }
    return fullURL
}
module.exports = {normalizeURL, getURLsFromHTML, crawlPage};