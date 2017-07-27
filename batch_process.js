const utils = require('./lib/data.utils')
const fs = require('fs')
const build = require('./lib/build')

// validate command line arguments
const url = process.argv[2]
const directory = process.argv[3]

if(!url || !directory) {
    console.log(
        `Please supply a URL and an output directory
        $ node batch_process.js [url] [directory]

        `)
    process.exit()
}


// wrap file and data processing in a callback
// executed after the http request has finished
function storeAndProcess(rawData) {
    parsedData = utils.organiseData(rawData)
    build.mainIndex(parsedData, rawData, directory)
    build.models(parsedData, directory)
    build.makes(parsedData, directory)
    build.css(directory)
    return
}

// execute the http request
utils.callApi(url, storeAndProcess)
