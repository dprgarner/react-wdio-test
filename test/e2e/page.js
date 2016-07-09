describe('React app', function () {
    it.only('can be accessed', function () {
        browser.url('http://localhost');
        expect(browser.getTitle()).to.contain('react');
    });
});