const http = require('http')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({explicitArray: false});


/**
* Anonymous function export:
* Makes an asynchronous HTTP request to the given API
* expects an XML format at the API endpoint
* @param: The URL of the API
* @param: A callback function to be executed when the http response is received
* @return: none
*/
module.exports = (url, callback) => {
    http.get(url, (response) => {

        // Check for the repsonse status
        const { statusCode } = response
        let error
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`)
            console.error(error.message)
            // consume response data to free up memory
            response.resume()
            return
        }

        response.setEncoding('utf8')
        // Continuously update stream with data
        let xml = ''
        response.on('data', (d) => {
            xml += d
        })
        response.on('end', () => {
            // Data reception is done
            console.log('parsing response')
            // Turn XML into a javascript object
            parser.parseString(xml, (err, result) => {
                if (err) {
                    console.error('Parsing XML to Javascript object failed')
                } else {
                    // execute callback with the resulting object
                    return callback(result)
                }
            })
        })
    })
}
