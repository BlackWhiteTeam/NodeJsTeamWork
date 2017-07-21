const BaseModel = require('./base/base.model');

class Chat extends BaseModel {
    static isValid(model) {
        // validate
        return typeof model !== 'undefined';
    }
}

module.exports = Chat;

