const db = {
    collection: () => { },
};
let items = [];

let ModelClass = null;
const validator = null;
let data = null;

const toArray = () => {
    return Promise.resolve(items);
};

const find = () => {
    return {
        toArray,
    };
};
const insert = (something) => {
    return Promise.resolve(something);
};
describe('greshen test', () => {
    it('greshentestzatest', () => {
        expect(3).to.equal(5);
    });
});