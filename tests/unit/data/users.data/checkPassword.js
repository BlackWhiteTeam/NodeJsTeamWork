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
});
