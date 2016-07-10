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

    it('can post a message', function () {
        browser
            .url('http://localhost')
            .waitForExist('.commentForm input', 2000);
        expect(browser.elements('.comment').value.length).to.equal(0);

        browser
            .setValue('.commentForm input:first-child', 'Hello')
            .setValue('.commentForm input:nth-child(2)', 'World')
            .click('.commentForm input:last-child')
            .waitForText('h2');

        expect(browser.elements('.comment').value.length).to.equal(1);
        expect(browser.getText('.comment h2')).to.contain('Hello');
        expect(browser.getText('.comment p')).to.contain('World');
    });

    it('keeps a message when reloading the page', function () {
        browser
            .url('http://localhost')
            .waitForExist('.commentForm input', 2000);
        browser
            .setValue('.commentForm input:first-child', 'Hello')
            .setValue('.commentForm input:nth-child(2)', 'World')
            .submitForm('form')

        browser.url('http://localhost');
        expect(browser.elements('.comment').value.length).to.equal(1);
        expect(browser.getText('.comment h2')).to.contain('Hello');
        expect(browser.getText('.comment p')).to.contain('World');
    });

    it('refreshes the page when a different user posts', function () {
        browser
            .url('http://localhost')
            .waitForExist('.commentForm input', 2000);
        var firstTab = browser.getCurrentTabId();

        browser
            .newWindow('http://localhost')
            .waitForExist('.commentForm input', 2000)
        var secondTab = browser.getCurrentTabId();

        expect(firstTab).to.not.equal(secondTab);

        browser
            .switchTab(firstTab)
            .setValue('.commentForm input:first-child', 'FirstTab')
            .setValue('.commentForm input:nth-child(2)', 'I am from the first tab')
            .submitForm('form')

        browser
            .switchTab(secondTab)
            .waitForText('h2');
        expect(browser.elements('.comment').value.length).to.equal(1);
        expect(browser.getText('.comment h2')).to.contain('FirstTab');
        expect(browser.getText('.comment p')).to.contain('I am from the first tab');
    });
});