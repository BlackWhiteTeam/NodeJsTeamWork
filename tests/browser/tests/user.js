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
    afterEach(() => {
        driver.quit();
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
    it('expect login to log correct user', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
    it('expect createpost to create', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#content > div > div.profile > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#content > div > form.col-md-6.col-md-offset-3 > label');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#content > div > div:nth-child(1) > div > div > div > h3 > strong > a');
            })
            .then((name) => {
                expect(name).to.equal('seleniumUser');
                done();
            })
            .catch(done);
    });
    it('expect ViewMyProfile to redirect', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > a');
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > ul > li:nth-child(1) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#username');
            })
            .then((name) => {
                expect(name).to.equal('seleniumUser');
                done();
            })
            .catch(done);
    });
    it('expect MyPhotos to redirect', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > ul > li:nth-child(2) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#content > div > div > div > div > div > h3 > strong > a');
            })
            .then((name) => {
                expect(name).to.equal('seleniumUser');
                done();
            })
            .catch(done);
    });
    it('expect addToFavourites to add and MyFavourites to redirect', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > a');
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > ul > li:nth-child(2) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#content > div > div > div > div > div > a.btn.btn-default.black-background.white.add');
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > a');
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > ul > li:nth-child(3) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#content > div > div > div > div > div > h3 > strong > a');
            })
            .then((name) => {
                expect(name).to.equal('seleniumUser');
                done();
            })
            .catch(done);
    });
    it('expect gallery to redirect and like to work', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-left > li:nth-child(3) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#content > div > div:nth-child(1) > div > div > div > h3 > div > img.like.like-dislike-btn');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.getText('#content > div > div:nth-child(1) > div > div > div > h3 > div > span.counter-likes');
            })
            .then((likes) => {
                expect(likes).to.equal('1');
                done();
            })
            .catch(done);
    });
    it('expect gallery to redirect and dislike to work', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-left > li:nth-child(3) > a');
            })
            .then(() => {
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#content > div > div:nth-child(1) > div > div > div > h3 > div > img.dislike.like-dislike-btn');
            })
            .then(() => {
                return utils.getText('#content > div > div:nth-child(1) > div > div > div > h3 > div > span.counter-dislikes');
            })
            .then((text) => {
                expect(text).to.equal('1');
                done();
            })
            .catch(done);
    });
    it('logout should logout succesfully', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('.container');
            })
            .then(() => {
                return utils.waitSeconds(1);
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
                return utils.waitSeconds(1);
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > a');
            })
            .then(() => {
                return utils.click('#navbar > ul.nav.navbar-nav.navbar-right > li > ul > li:nth-child(5) > a');
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
});