const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');


const BaseData = require('../../../../data/posts.data');

const db = {
    collection: () => { },
};
let idPost = 1;

let ModelClass = null;
const validator = null;
let data = null;

const update = (item1) => {
    return Promise.resolve(item1._id);
};

describe('dislike tests', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    update,
                };
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
    });
    it('update should be called with right id', () => {
        return data.dislike(idPost)
            .then((result) => {
                expect(result[0]).to.equal(ObjectId(idPost)[0]);
                expect(result[1]).to.equal(ObjectId(idPost)[1]);
                expect(result[2]).to.equal(ObjectId(idPost)[2]);
            });
    });
});
