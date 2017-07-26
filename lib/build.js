const fs = require('fs')
const template = require('./template')


module.exports.mainIndex = (parsedData, rawData, directory) => {
    const fileName = 'index'
    const heading = 'Index Page'
    const subHeading = 'Camera Makes'
    const navLinks = getCameraMakeNames(parsedData) || []
    const urls = []
    // validate the rawData is the expected type
    if(rawData.works && rawData.works.work) {
        // parse the urls
        // use rawData to get the first 10 images in order
        for(let x = 0; x < rawData.works.work.length && x < 10; x++) {
            urls.push(rawData.works.work[x].urls.url[1]._)
        }
    }
    // create the HTML template
    const htmlString = template.buildPage(heading, subHeading, navLinks, urls)
    // if a directory was passed in, write the template to file
    if(directory) {
        writeToFile(directory, fileName, htmlString)
    }
    else {
        return htmlString
    }
}

module.exports.models = (parsedData, directory) => {
    const subHeading = 'Camera Makes'
    const navLinks = getCameraMakeNames(parsedData, ['index'])
    // the models array will contain a model object for each page to be built
    const models = extractModelsData(parsedData)
    const htmlStrings = []
    // create the HTML templates for each camera model
    models.forEach((model) => {
        const htmlString = template.buildPage(model.name, subHeading, navLinks, model.imageUrls)
        htmlStrings.push(htmlString)
        // if a directory was passed in, write the template to file
        if(directory) {
            writeToFile(directory, model.name, htmlString)
        }
    })
    if(!directory) {
        return htmlStrings
    }
}

module.exports.makes = (parsedData, directory) => {
    const subHeading = 'Camera Models'
    // the makes array will contain a make object for each page to be built
    const makes = extractMakesData(parsedData)
    const htmlStrings = []
    // create the HTML templates for each camera model
    makes.forEach((make) => {
        const htmlString = template.buildPage(make.name, subHeading, make.navLinks, make.imageUrls)
        htmlStrings.push(htmlString)
        // if a directory was passed in, write the template to file
        if(directory) {
            writeToFile(directory, make.name, htmlString)
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
    // validate the input
    if(parsedData && parsedData !== null && typeof parsedData === 'object') {
        // loop through each make
        for (let make in parsedData) {
            if (parsedData.hasOwnProperty(make)) {
                // loop through each model of that make
                for (let model in parsedData[make]) {
                    if (parsedData[make].hasOwnProperty(model)) {
                        // create an object for each model
                        let modelAndUrl = { name: model, imageUrls: [] }
                        // loop through and save each image url for that model (max 10)
                        for(let x = 0; x < parsedData[make][model].length && x < 10; x++) {
                            modelAndUrl.imageUrls.push(parsedData[make][model][x].urls.url[1]._)
                        }
                        models.push(modelAndUrl) // save the model
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
                let makeAndUrl = { name: make, imageUrls: [], navLinks: ['index'] }
                // loop through each model of that make
                for (let model in parsedData[make]) {
                    if (parsedData[make].hasOwnProperty(model)) {
                        makeAndUrl.navLinks.push(model)
                        // loop through and save each image url for that model
                        // the 2nd condition checks that there are < 10 imageUrls
                        for(let x = 0; x < parsedData[make][model].length && makeAndUrl.imageUrls.length < 10; x++) {
                            makeAndUrl.imageUrls.push(parsedData[make][model][x].urls.url[1]._)
                        }
                        makes.push(makeAndUrl) // save the make
                    }
                }
            }
        }
    }
    return makes
}
