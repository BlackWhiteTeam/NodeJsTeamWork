// const { expect } = require('chai');
// const sinon = require('sinon');

// const BaseData = require('../../../../data/posts.data');

// const db = {
//     collection: () => { },
// };
// const item = 'testResult';

// let ModelClass = null;
// const validator = null;
// let data = null;

// const toArray = () => {
//     return Promise.resolve(item);
// };

// const find = (object) => {
//     return {
//         toArray,
//     };
// };

// describe('getMyFavoritePosts', () => {
//     beforeEach(() => {
//         sinon.stub(db, 'collection')
//             .callsFake(() => {
//                 return {
//                     find,
//                 };
//             });
//         ModelClass = class {
//         };
//         data = new BaseData(db, ModelClass, validator);
//     });
//     afterEach(() => {
//         db.collection.restore();
//     });
//     // Arrange
//     it('find and ToArray should be called', () => {
//         const expectedResult = item;
//         return data.getMyFavoritesPosts(item)
//             .then((result) => {
//                 expect(result).to.equal(expectedResult);
//             });
//     });
// });
