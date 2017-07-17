const BaseModel = require('./base/base.model');

class Post extends BaseModel {
    static isValid(model) {
        // validate
        return typeof model !== 'undefined';
    }
}

module.exports = Post;
