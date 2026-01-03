process.argv
const {crawlPage} = require('./crawl');
async function main(){
    if (process.argv.length < 3){
        console.log("Error, don't pass the url parameter");
    }
    if (process.argv.length > 3){
        console.log("Error, pass too many arguments");
    }
    try{
        const result = await crawlPage(process.argv[2], {});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
main()