const {JSDOM} = require('jsdom');

async function crawlPage(baseURL, pages){
    try{
        const data = await fetch(baseURL);
        console.log(`Starting crawling on ${baseURL}`)
        if (data.headers.get('content-type').includes('text/html')){
            const html = await data.text();
            const urls = getURLsFromHTML(html, baseURL);
            for(const url of urls){
                pages[url] = 1;
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
        if (a.href.slice(0, 1) === '/'){
            try{
                const newURL = `${baseURL}${a.href}`;
                const fullURLObj = new URL(newURL);
                urls.push(`${fullURLObj.href}`)
            }catch(err){
                console.log(`error with message: ${err}, relative path invalid on ${a.href}`)
            }
        }else{
            try{
                const fullURLObj = new URL(a.href);
                urls.push(fullURLObj.href);
            }catch(err){
                console.log(`Error with message: ${err}, absolute path invalid on ${a.href}`)
            }
            
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