/**
* buildPage:
* Creates a html template string with the given data
* @param: heading - The <h1> tag text
* @param: subHeading - The <h3> tag text
* @param: navLinks - An array of names that will be both text and href
* @param: urls - An array of url strings that will be the <img src... >
* @return: A string that represents a HTML page
*/
module.exports.buildPage = (heading, subHeading, navLinks, urls) => {

    // create a list of links to models
    let links = ''
    navLinks.forEach((link) => {
        links += `<a href="${link}.html">${link}</a>
        `// newline for html formatting
    })

    // create a list of image tags
    let images = ''
    // build at most 10 image tags
    for(let x = 0; x < urls.length && x < 10; x++) {
        images += `<img src="${urls[x]}">
        `// newline for html formatting
    }

    return (
    `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>API Image Browser</title>
    </head>
    <body>
        <header>
            <h1>${heading}</h1>

            <nav>
                <h3>${subHeading}</h3>
                ${links}
            </nav>
        </header>
        ${images}

    </body>
    </html>
    `)
}
