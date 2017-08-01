const BaseData = require('./base/base.data');
const Chat = require('../models/chat.model');

class ChatsData extends BaseData {
    constructor(db) {
        super(db, Chat, Chat);
    }
}

module.exports = ChatsData;
