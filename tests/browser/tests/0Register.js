const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('Users', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;
    const user = {
        username: 'testuser1',
        email: 'testuser1@abv.bg',
        password: 'testuser12',
    };
    beforeEach(() => {
        driver = setupDriver('chrome');
        utils.setDriver(driver);
    });
    afterEach(() => {
        driver.quit();
    });
    it('creating user in database', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#content > div > div > div > form > p:nth-child(4) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.setValue('#username', user.username);
            })
            .then(() => {
                return utils.setValue('#email', user.email);
            })
            .then(() => {
                return utils.setValue('#pw', user.password);
            })
            .then(() => {
                return utils.setValue('#pw2', user.password);
            })
            .then(() => {
                return utils.click('#register-submit');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#username');
            })
            .then((username) => {
                expect(username).to.be.equal(user.username);
                return utils.getText('#content > div > div > p.email');
            })
            .then((email) => {
                expect(email).to.equal(user.email);
                done();
            })
            .catch(done);
    });
});