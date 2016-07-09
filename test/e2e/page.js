var promisify = require('promisify-node');
var fs = promisify('fs');
var path = require('path');

var COMMENTS_FILE = path.join(__dirname, '..', '..', 'test_comments.json');

describe('React app', function () {
    afterEach(function (done) {
        fs.access(COMMENTS_FILE, fs.F_OK)
            .then(() => fs.unlink(COMMENTS_FILE))
            .then(function () {
                console.log('Cleared comments file');
            })
            .catch(function () {
                console.log('No comments file');
            })
            .then(() => done());
    });

    it('can be accessed', function () {
        browser.url('http://localhost');
        expect(browser.getTitle()).to.contain('react');
    });

    it('can post a message by clicking the button', function () {
        browser.url('http://localhost')
        expect(browser.elements('.comment').value.length).to.equal(0);

        browser
            .click('.commentForm input:first-child')
            .keys('Hello')
            .click('.commentForm input:nth-child(2)')
            .keys('World')
            .click('.commentForm input:last-child')
            .waitForText('h2');

        expect(browser.elements('.comment').value.length).to.equal(1);
        expect(browser.getText('.comment h2')).to.contain('Hello');
        expect(browser.getText('.comment p')).to.contain('World');
    });

    it('keeps a message when reloading the page', function () {
        browser.url('http://localhost')
            .click('.commentForm input:first-child')
            .keys('Hello')
            .click('.commentForm input:nth-child(2)')
            .keys('World')
            .click('.commentForm input:last-child')

        browser.url('http://localhost');
        expect(browser.elements('.comment').value.length).to.equal(1);
        expect(browser.getText('.comment h2')).to.contain('Hello');
        expect(browser.getText('.comment p')).to.contain('World');
    });
});