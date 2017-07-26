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
        it('should still return a string when the data is garbage', function() {
            const stillSomeHTMLString = build.mainIndex('a;sdlkfja;ds02934857   ....... asdf', '_)(*Plj;asdf)')
            expect(stillSomeHTMLString).to.be.a('string')
        })
    })
    describe('the models function', function() {
        it('should return an array when no directory argument is given', function() {
            expect(build.models(parsedData)).to.be.an('array')
        })
        it('should return an array when the data is garbage', function() {
            const someArray = build.models('lsk(874#@#% ..  |\][])')
            expect(someArray).to.be.a('array')
        })
        it('should return an empty array when the data is garbage', function() {
            const someArray = build.models('lsk(874#@#% ..  |\][])')
            expect(someArray).to.have.lengthOf(0)
        })
    })
    describe('the makes function', function() {
        it('should return an array when no directory argument is given', function() {
            expect(build.makes(parsedData)).to.be.an('array')
        })
        it('should return an array when the data is garbage', function() {
            const someArray = build.makes('lsk(874#@#% ..  |\][])')
            expect(someArray).to.be.a('array')
        })
        it('should return an empty array when the data is garbage', function() {
            const someArray = build.makes('lsk(874#@#% ..  |\][])')
            expect(someArray).to.have.lengthOf(0)
        })
    })
})
