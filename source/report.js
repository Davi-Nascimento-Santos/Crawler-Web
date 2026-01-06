function sortPages(pages){
    const pagesArray = [];
    for (const ele in pages){
        pagesArray.push([ele, pages[ele]]);
    }
    const sortedPages = pagesArray.sort((a, b) => b[1] - a[1])
    return sortedPages;
}

module.exports = {sortPages};