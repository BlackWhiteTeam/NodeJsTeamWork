const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('Redirects', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;
    beforeEach(() => {
        driver = setupDriver('chrome');
        utils.setDriver(driver);
    });
    afterEach(() => {
        driver.quit();
    });
    it('expect about to redirect correctly', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('body > footer > div > p.pull-right > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-left > li:nth-child(1) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
    it('expect users to redirect correctly', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-left > li:nth-child(2) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils
                    .getPlaceholder('#searchField');
            })
            .then((text) => {
                expect(text).to.be.equal('Search User By Name');
                done();
            })
            .catch(done);
    });
    it('expect login to redirect correctly', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#content > div > div > div > h1');
            })
            .then((text) => {
                expect(text).to.be.equal('Login');
                done();
            })
            .catch(done);
    });
});