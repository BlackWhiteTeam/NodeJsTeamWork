const { expect } = require('chai');
const sinon = require('sinon');
const CryptoJS = require('crypto-js');

const BaseData = require('../../../../data/users.data');
const db = {
    collection: () => { },
};

let user = 'pesho';
let password = 'goshov';

let ModelClass = null;
let validator = null;
let data = null;

ModelClass = class {
};

validator = {
};

data = new BaseData(db, ModelClass, validator);

describe('checkPassword', () => {
    it('expect to reject if no user provided', () => {
        user = false;
        return data.checkPassword(user, password)
            .then(() => {
                expect(false).to.be.true;
            },
            () => {
                expect(true).to.be.true;
            });
    });
    it('expect to reject if wrong password is provided', () => {
        user = true;
        return data.checkPassword(user, password)
            .then(() => {
                expect(false).to.be.true;
            },
            () => {
                expect(true).to.be.true;
            });
    });
    it('expect to resoolve with user when everything is correct', () => {
        // eslint-disable-next-line new-cap
        const cryptedPass = CryptoJS.SHA1(password).toString();
        user = {
            password: cryptedPass,
        };
        return data.checkPassword(user, password)
            .then((result) => {
                expect(result).to.deep.equal(user);
            });
    });
});
