describe('google', function () {
    it('can be accessed', function () {
        browser.url('http://www.google.com')
        expect(browser.getTitle()).to.contain('Google');
    });
});