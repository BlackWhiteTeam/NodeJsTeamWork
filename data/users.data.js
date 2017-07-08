const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    checkPassword(username, password) {
        this.collection.findOne({
            username,
        }).then((user) => {
            if (!user) {
                throw new Error('Invalid user');
            }
            if (user.password !== password) {
                throw new Error('Invalid password');
            }
            return true;
        });
    }

    _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
