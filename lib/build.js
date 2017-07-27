const fs = require('fs')
const pug = require('pug')
const pugTemplate = pug.compileFile('./templates/image-browser.pug')

/**
* mainIndex:
* Generates a template for the index page and writes the resulting string
* to file in the given directory
* @param: parsedData - Object with camera makes as keys & values from rawData
* @param: rawData - Object that is the representation of the raw
* XML image data from the Redbubble API
* @param: directory - the path to write the files
* @return: the htmlString if no directory is given, else nothing
*/
module.exports.mainIndex = (parsedData, rawData, directory) => {
    const fileName = 'index'
    const data = {
        heading: 'Index Page',
        subHeading: 'Camera Makes',
        navLinks: getCameraMakeNames(parsedData) || [],
        urls: []
    }
    // validate the rawData is the expected type
    if(rawData && rawData.works && rawData.works.work) {
        // parse the urls
        // use rawData to get the first 10 images in order
        for(let x = 0; x < rawData.works.work.length && x < 10; x++) {
            data.urls.push(rawData.works.work[x].urls.url[1]._)
        }
    }
    // create the HTML template
    const htmlString = pugTemplate(data)
    // if a directory was passed in, write the template to file
    if(directory) {
        writeToFile(directory, fileName, htmlString)
    }
    else {
        return htmlString
    }
}

/**
* models:
* Generates a html template for each model in the data and writes the
* resulting string to file in the given directory
* @param: parsedData - Object with camera makes as keys & values from rawData
* @param: directory - the path to write the files
* @return: the htmlStrings if no directory is given, else nothing
*/
module.exports.models = (parsedData, directory) => {
    // the models array will contain a model object for each page to be built
    const models = extractModelsData(parsedData)
    const htmlStrings = []
    // create the HTML templates for each camera model
    models.forEach((data) => {
        const htmlString = pugTemplate(data)
        htmlStrings.push(htmlString)
        // if a directory was passed in, write the template to file
        if(directory) {
            writeToFile(directory, data.heading, htmlString)
        }
    })
    if(!directory) {
        return htmlStrings
    }
}

/**
* makes:
* Generates a html template for each make in the data and writes the
* resulting string to file in the given directory
* @param: parsedData - Object with camera makes as keys & values from rawData
* @param: directory - the path to write the files
* @return: the htmlStrings if no directory is given, else nothing
*/
module.exports.makes = (parsedData, directory) => {
    // the makes array will contain a make object for each page to be built
    const makes = extractMakesData(parsedData)
    const htmlStrings = []
    // create the HTML templates for each camera model using pug
    makes.forEach((data) => {
        const htmlString = pugTemplate(data)
        htmlStrings.push(htmlString)
        // if a directory was passed in, write the template to file
        if(directory) {
            writeToFile(directory, data.heading, htmlString)
        }
    })
    if(!directory) {
        return htmlStrings
    }
}

// private helper functions below ---->

function writeToFile(directory, fileName, htmlString) {
    // __dirname is the directory of the project - a node variable
    // the '..' takes it up from the lib folder to the root
    // the {directory} is the given argument
    fs.writeFile(`${__dirname}/../${directory}/${fileName}.html`, htmlString, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`${fileName}.html was saved.`);
    })
}

function getCameraMakeNames(parsedData, array) {
    const makes = array || []
    // validate the input
    if(parsedData && parsedData !== null && typeof parsedData === 'object') {
        // parse the data for makes
        for (let prop in parsedData) {
            if (parsedData.hasOwnProperty(prop)) {
                makes.push(prop)
            }
        }
    }
    return makes
}

function extractModelsData(parsedData) {
    const models = []
    const makes = getCameraMakeNames(parsedData, ['index'])
    // validate the input
    if(parsedData && parsedData !== null && typeof parsedData === 'object') {
        // loop through each make
        for (let make in parsedData) {
            if (parsedData.hasOwnProperty(make)) {
                // loop through each model of that make
                for (let model in parsedData[make]) {
                    if (parsedData[make].hasOwnProperty(model)) {
                        // create an object for each model
                        const data = { heading: model, subHeading: 'Camera Makes', navLinks: makes, urls: [] }
                        // loop through and save each image url for that model (max 10)
                        for(let x = 0; x < parsedData[make][model].length && x < 10; x++) {
                            data.urls.push(parsedData[make][model][x].urls.url[1]._)
                        }
                        models.push(data) // save the model
                    }
                }
            }
        }
    }
    return models
}

function extractMakesData(parsedData) {
    const makes = []
    // validate the input
    if(parsedData && parsedData !== null && typeof parsedData === 'object') {
        // loop through each make
        for (let make in parsedData) {
            if (parsedData.hasOwnProperty(make)) {
                // create an object for each make
                let data = { heading: make, subHeading: 'Camera Models', urls: [], navLinks: ['index'] }
                // loop through each model of that make
                for (let model in parsedData[make]) {
                    if (parsedData[make].hasOwnProperty(model)) {
                        data.navLinks.push(model)
                        // loop through and save each image url for that model
                        // the 2nd condition checks that there are < 10 urls
                        for(let x = 0; x < parsedData[make][model].length && data.urls.length < 10; x++) {
                            data.urls.push(parsedData[make][model][x].urls.url[1]._)
                        }
                        makes.push(data) // save the make
                    }
                }
            }
        }
    }
    return makes
}
