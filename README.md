# NodeJS Batch Processor
Redbubble has APIs that produce XML image data. This NodeJS program is a batch processor that produces HTML files for browsing the images in that data.
It takes the API URL and the output directory as parameters.
To run the program you need to have node and npm/yarn installed.

I used

Node v6.9.2
yarn 0.24.5

From the project root
```script
yarn install
```
Or you can use npm
```script
npm install
```

then
```script
node batch_process.js <url> <directory>
```

After the program has run you can browse the images by opening `index.html` and using the links.
