const {JSDOM} = require('jsdom');

async function crawlPage(baseURL, pages){
    try{
        const data = await fetch(baseURL);
        console.log(`Starting crawling on ${baseURL}`)
        if (data.headers.get('content-type').includes('text/html')){
            const html = await data.text();
            const urls = getURLsFromHTML(html, baseURL);
            for(const url of urls){
                if (pages[url] > 0){
                    pages[url]++;
                }else{
                    pages[url] = 1;
                }
            }
        }else{
            throw new Error("Error, no HTML page");
        }
    }catch(err){
        console.log(`Error, message: ${err.message}`)
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