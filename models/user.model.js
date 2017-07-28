const BaseModel = require('./base/base.model');
const constants = require('../utils/globalConstants');

class User extends BaseModel {
    static isValid(model) {
        const result =
            !!(typeof model.name !== 'undefined'
            && typeof model.name === 'string'
            && model.password.match(constants.USER_PASSWORD_MATCH_PATTERN)
            && model.name.match(constants.USERNAME_MATCH_PATTERN)
            && model.email.match(constants.USER_EMAIL_MATCH_PATTERN)
            && model.stringProfilePicture
            .match(constants.USER_PROFILE_PICTURE_MATCH_PATTERN));
            console.log(result);
        return result;
    }
}

module.exports = User;
