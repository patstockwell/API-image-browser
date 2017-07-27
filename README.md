# NodeJS Batch Processor
Redbubble has APIs that produce XML image data. This NodeJS program is a batch processor that produces HTML files for browsing the images in that data.
It takes the API URL and the output directory as parameters.
To run the program you need to have node and npm/yarn installed.


Node v6.9.2

yarn 0.24.5

### Install the modules

From the project root
```script
yarn install
```
Or you can use npm
```script
npm install
```

### Run the processor

```script
node batch_process.js <url> <directory>
```

### Browsing the images
After the program has run you can view the images by opening `index.html` in a browser and using the links.
