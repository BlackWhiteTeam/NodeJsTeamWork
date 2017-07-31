const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe.skip('Redirects', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;
    const user = {
        username: 'seleniumUser',
        email: 'selenium@user.bg',
        password: 'seleniumPassword',
    };
    beforeEach(() => {
        driver = setupDriver('chrome');
        utils.setDriver(driver);
    });
    //
    it('expect about to redirect correctly', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.click('body > footer > div > p.pull-right > a');
            })
            .then(() => {
                return utils
                    .getText('#content > div > div.container-fluid > div > div:nth-child(3) > div > div.card-block > h4');
            })
            .then((name) => {
                expect(name).to.be.equal('Cvetozar Kalchev');
                done();
            })
            .catch(done);
    });
    it('expect home to redirect correctly', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-left > li:nth-child(1) > a');
            })
            .then(() => {
                return utils
                    .getText('#content > a');
            })
            .then((text) => {
                expect(text).to.be.equal('CLICK TO CONTINUE');
                done();
            })
            .catch(done);
    });
});