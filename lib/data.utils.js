const http = require('http')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({explicitArray: false});


/**
* callApi:
* Makes an asynchronous HTTP request to the given API
* expects an XML format at the API endpoint
* @param: The URL of the API
* @param: A callback function to be executed when the http response is received
* @return: none
*/
module.exports.callApi = (url, callback) => {
    console.log('Making HTTP request...')
    http.get(url, (response) => {

        // Check for the repsonse status
        const { statusCode } = response
        let error
        if (statusCode !== 200) {
            error = new Error
            (
                `Request Failed.
                Status Code: ${statusCode}
                Please check the URL
                `
            )
            console.error(error.message)
            // consume response data to free up memory
            response.resume()
            process.exit()
        }

        response.setEncoding('utf8')
        // Continuously update stream with data
        let xml = ''
        response.on('data', (d) => {
            xml += d
        })
        response.on('end', () => {
            // Data reception is done
            // Turn XML into a javascript object
            parser.parseString(xml, (err, result) => {
                if (err) {
                    console.error('Parsing XML to Javascript object failed')
                } else {
                    if(callback) {
                        // execute callback with the resulting object
                        return callback(result)
                    }
                }
            })
        })
    })
}

/**
* organiseData:
* Parses the given image data and brings the make and model to the top level
* @param: the raw data from the API call
* @return: An obect whose key:value pairs are make:model[ {details}, ...]
*/
module.exports.organiseData = (rawData) => {
    let makesAndModels = {}
    // validate the rawData is the expected type
    if(rawData && rawData.works && rawData.works.work) {
        const images = rawData.works.work
        images.forEach((i) => {
            let model = i.exif.model
            let make = i.exif.make
            if(make) {
                makesAndModels[make] = {}
            }
            if(make && !model) {
                makesAndModels[make]['undefinedModel'] ? makesAndModels[make]['undefinedModel'].push(i) : makesAndModels[make]['undefinedModel'] = [i]
            }
            if(model && make) {
                makesAndModels[make][model] ? makesAndModels[make][model].push(i) : makesAndModels[make][model] = [i]
            }
        })
    }
    return makesAndModels
}
