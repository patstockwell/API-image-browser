const expect = require('chai').expect
const template = require('../lib/template')

describe('In template file', function() {
    describe('the buildCameraMake function', function() {
        let string
        it('should return a string', function() {
            string = template.buildPage(
                'Here is the Heading',
                'Sub Heading',
                [
                    'some link',
                    'some other link'
                ],
                [
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.2041.1.flat,300x300,075,f.jpg',
                    'http://ih1.redbubble.net/work.240509.1.flat,300x300,075,f.jpg'
                ]
            )
            expect(string).to.be.a('string')
        })
        it('should contain a heading with the camera make', function() {
            expect(string.indexOf('<h1>Here is the Heading</h1>') > -1).to.be.true
        })
        it('should contain no more than 10 images', function() {
            console.log(string)
            expect(string.split("img").length - 1 <= 10).to.be.true
        })
    })
})
