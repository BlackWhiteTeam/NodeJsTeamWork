const BaseData = require('./base/base.data');
const Chat = require('../models/chat.model');

class ChatsData extends BaseData {
    constructor(db) {
        super(db, Chat, Chat);
    }

    findChatsByUsername(username) {
        return this.collection.find({
            $or: [{ firstUser: username },
                { secondUser: username }],
        }).toArray();
    }

    addMessageToChat(firstUser, secondUser, author, message) {
        return this.collection.findOne(
            {
                $or:
                    [
                        { $and: [
                            { firstUser: firstUser },
                            { secondUser: secondUser },
                        ] },
                        { $and: [
                            { firstUser: secondUser },
                            { secondUser: firstUser },
                        ] },
                    ],
            })
            .then((chat) => {
                if (!chat) {
                    const model = {
                        firstUser: firstUser,
                        secondUser: secondUser,
                        messages: [{ author, message }],
                    };
                    return this.collection.insert(model)
                        .then(() => {
                            return this.ModelClass.toViewModel(model);
                        });
                }
                return this.collection.findAndModify(
                    {
                        $or:
                            [
                                { $and: [
                                    { firstUser: firstUser },
                                    { secondUser: secondUser },
                                ] },
                                { $and: [
                                    { firstUser: secondUser },
                                    { secondUser: firstUser },
                                ] },
                            ] },
                    [],
                    { $push: { messages: { author, message } } },
                    { new: true });
            });
    }
}

module.exports = ChatsData;
