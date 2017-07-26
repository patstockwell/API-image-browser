const expect = require('chai').expect
const utils = require('../lib/data.utils')

// store the data after the first call so each test can reuse it
let data = {}

describe('data.utils file', function() {
    // add a 10sec timeout to override the 2sec defaults
    // allow time for the async call to be made on poor connections
    this.timeout(10000);
    describe('The getImageData function', function() {
        it('should execute the callback', function(done) {
            function callback(x) {
                data = x
                // if done is executed then callback() was called
                done()
            }
            utils.callApi('http://take-home-test.herokuapp.com/api/v1/works.xml', callback)
        })
    })

    describe('The data object', function() {
        it('should exist', function() {
            expect(data).to.include.all.keys('works');
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

    })
})
