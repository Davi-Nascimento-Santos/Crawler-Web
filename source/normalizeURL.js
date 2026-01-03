const {JSDOM} = require('jsdom');

function getURLsFromHTML(html, baseURL){
    const dom = new JSDOM(html);
    const as = dom.window.document.querySelectorAll('a');
    const urls = [];
    for (const a of as){
        console.log(a.href);
        if (a.href.slice(0, 1) === '/'){
            try{
                const fullURLObj = new URL(`${baseURL}${a.href}`);
                urls.push(`${fullURLObj.href}`)
            }catch(err){
                console.log("error, relative path invalid")
            }
        }else{
            try{
                const fullURLObj = new URL(a.href);
                urls.push(fullURLObj.href);
            }catch(err){
                console.log("Error, absolute path invalid")
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
module.exports = {normalizeURL, getURLsFromHTML};