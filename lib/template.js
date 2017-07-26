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
