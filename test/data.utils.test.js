const expect = require('chai').expect
const utils = require('../lib/data.utils')
const sinon = require('sinon')
const http = require('http')
const stream = require('stream')
const data = require('./data').rawData


describe('data.utils file', function() {
    // to avoid making the actual http request, sinon.js is used to
    // stub the method
    // the expected and data variables are used in the stub
    before(function () {
        const data =
        `<exif>
            <copyright/>
            <flash>16</flash>
            <sharpness>0</sharpness>
        </exif>`
        const expected = {
            statusCode: 200,
            setEncoding: (x) => {},
            on: (string, callback) => {
                string === 'data' ? callback(data) : callback()
            }
        }
        sinon.stub(http, 'get').yields(expected)
    })

    after(function () {
        // remove the stubbed version of get() and restore the original
        http.get.restore()
    })

    describe('The getImageData function', function() {
        it('should execute the callback', function(done) {
            function callback(x) {
                // if done is executed then callback() was called
                done()
            }
            utils.callApi('http://take-home-test.herokuapp.com/api/v1/works.xml', callback)
        })
    })


    describe('The data object', function() {
        it('should exist', function() {
            expect(data).to.include.all.keys('works')
        })
    })

    describe('Organise data function', function() {
        let makesAndModels = null
        it('should return an object', function() {
            makesAndModels = utils.organiseData(data)
            expect(makesAndModels).to.be.an('object')
        })
        it('should return an object with a camera make as a key', function() {
            let make = undefined
            if('NIKON CORPORATION' in makesAndModels) {
                make = makesAndModels['NIKON CORPORATION']
            }
            else if('Canon' in makesAndModels) {
                make = makesAndModels['Canon']
            }
            else if('FUJIFILM' in makesAndModels) {
                make = makesAndModels['FUJIFILM']
            }
            expect(make).to.not.be.an('undefined')
        })
        it('should return an object when the input is garbage', function() {
            makesAndModels = utils.organiseData('as;dlkf )(*&  .,)')
            expect(makesAndModels).to.be.an('object')
        })
        it('should return an object when the input is empty', function() {
            makesAndModels = utils.organiseData()
            expect(makesAndModels).to.be.an('object')
        })
    })
})
