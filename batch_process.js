const api = require('./lib/api_request')
const fs = require('fs')

let data = {}

// validate command line arguments
const url = process.argv[2]
const directory = process.argv[3]

if(!url || !directory) {
    console.log(`
        Batch Process failed.
        Please supply a URL and an output directory
        $ node batch_process.js [url] [directory]

        `)
    process.exit()
}


// A callback to pass to the api request function
// executed after the http request has finished
function store(newData) {
    data = newData
    console.log(data)
}

// execute the api call
api(url, store)


fs.writeFile(__dirname + "/" + directory + "/test.html", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
