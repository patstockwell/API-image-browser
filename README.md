# NodeJS Batch Processor
Redbubble has APIs that produce XML image data. This NodeJS program is a batch processor that produces HTML files for browsing the images in that data.
It takes the API URL and the output directory as parameters. After the program has run you can browse the images by opening index.html and using the links.
To run the program you need to have node and npm installed.
From the project root
```script
npm install
```

then
```script
node batch_process.js <url> <directory>
```
