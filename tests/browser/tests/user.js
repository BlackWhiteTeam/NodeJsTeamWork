const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('Users', () => {
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

    it('expect Register to create user in database and loggin', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.click('#content > div > div > div > form > p:nth-child(4) > a');
            })
            .then(() => {
                driver.sleep(2000);
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
    it('expect login to log correct user', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.setValue('#username', user.username);
            })
            .then(() => {
                return utils.setValue('#password', user.password);
            })
            .then(() => {
                return utils.click('#content > div > div > div > form > p:nth-child(3) > input');
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