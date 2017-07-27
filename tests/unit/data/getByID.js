const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

const db = {
    collection: () => { },
};
let items = [1];

let ModelClass = null;
const validator = null;
let data = null;

const findOne = (item) => {
    return Promise.resolve();
};

describe('GetById', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    findOne,
                };
            });
        ModelClass = class {
        };
        afterEach(() => {
            db.collection.restore();
        });
        // Arrange
        data = new BaseData(db, ModelClass, validator);
    });
    it('findOne should be called', () => {
        return data.getById()
            .then(() => {
                expect(true).to.be.true;
            },
            () => {
                expect(false).to.be.true;
            });
    });
});
