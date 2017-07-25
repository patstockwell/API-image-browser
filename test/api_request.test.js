const expect = require('chai').expect
const get = require('../lib/api_request')

let data = {}
describe('api_request file', function() {
    // add a 10sec timeout to override the 2sec defaults
    // allow time for the async call to be made on poor connections
    this.timeout(10000);
    describe('The getImageData function', function() {
        it('should execute the callback', function(done) {
            function dummy(x) {
                data = x
                console.log(data)
                done()
            }
            get('http://take-home-test.herokuapp.com/api/v1/works.xml', dummy)
        })
    })
    describe('The data object', function() {
        it('should exist', function() {
            expect(data).to.include.all.keys('works');
        })
    })
})
