const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/users.data');

const db = {
    collection: () => { },
};
const item = 'testResult';

let ModelClass = null;
const validator = null;
let data = null;

const toArray = () => {
    return Promise.resolve(item);
};

const find = (object) => {
    return {
        toArray,
    };
};

describe('getPostsByUsername', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    find,
                };
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
    });
    // Arrange
    it('find should be called with correct string', () => {
        const expectedResult = item;
        return data.getAllUsersByMatchingString(item)
            .then((result) => {
                expect(result).to.equal(expectedResult);
            });
    });
});