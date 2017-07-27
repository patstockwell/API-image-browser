# NodeJS Batch Processor
Redbubble has APIs that produce XML image data. This NodeJS program is a batch processor that produces HTML files for browsing the images in that data.
It takes the API URL and the output directory as parameters.
To run the program you need to have node and npm/yarn installed.
I used the following two versions.

Node v6.9.2

yarn v0.24.5

### Setup

From the project root
```script
yarn install
```

### To run the tests
```script
yarn test
```

### Start the processor
```script
node batch_process.js <url> <directory>
```

### Browsing the images
After the program has run, navigate to the given directory and view the images by opening `index.html` in a browser and using the links.

#### NPM v Yarn
You can also use npm if you prefer instead of yarn
```script
npm install
```

```script
npm test
```
