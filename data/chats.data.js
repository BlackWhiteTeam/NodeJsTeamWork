const BaseData = require('./base/base.data');
const Chat = require('../models/chat.model');

class ChatsData extends BaseData {
    constructor(db) {
        super(db, Chat, Chat);
    }

    findChatsByUsername(username) {
        return this.collection.find({ $or: [{ firstUser: username },
            { secondUser: username }] }).toArray();
    }

    addMessageToChat(firstUser, secondUser, author, message) {
        return this.collection.findOne({
            $and: [{ firstUser: firstUser }, { secondUser: secondUser }],
        }).then((chat) => {
            if (!chat) {
                const model = {
                    firstUser: firstUser,
                    secondUser: secondUser,
                    messages: [{ author, message }] };
                return this.collection.insert(model)
                    .then(() => {
                        return this.ModelClass.toViewModel(model);
                    });
            }
            chat.messages.push({ author, message });
            return chat;
        });
    }
}

module.exports = ChatsData;
