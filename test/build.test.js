const build = require('../lib/build')
const expect = require('chai').expect
const rawData = require('./data').rawData
const parsedData = require('./data').parsedData


describe('the build module', function() {
    describe('the mainIndex function', function() {
        const string = build.mainIndex(parsedData, rawData)
        it('should return a string when no directory argument is given', function() {
            expect(string).to.be.a('string')
        })
        it('should contain a heading with index', function() {
            expect(string.indexOf('<h1>Index Page</h1>') > -1).to.be.true
        })
    })
    describe('the models function', function() {
        it('should return an array when no directory argument is given', function() {
            expect(build.models(parsedData)).to.be.an('array')
        })
    })
    describe('the makes function', function() {
        it('should return an array when no directory argument is given', function() {
            expect(build.makes(parsedData)).to.be.an('array')
        })
    })
})
