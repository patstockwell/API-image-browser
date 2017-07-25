const utils = require('./lib/data.utils')
const fs = require('fs')

// +++++++++++++++++++++++++ FOR DEVELOPMENT ONLY. REMOVE LATER
const util = require('util')
const log = (obj) => { console.log(util.inspect(obj, {showHidden: false, depth: null})) }
// +++++++++++++++++++++++++

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


// Passed to the api request function as a callback
// executed after the http request has finished
function store(rawData) {
    data = utils.organiseData(rawData)
    log(data)
}

// execute the api call
utils.callApi(url, store)
