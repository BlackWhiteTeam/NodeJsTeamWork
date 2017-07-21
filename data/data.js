const UsersData = require('./users.data');
const PostsData = require('./posts.data');
const ChatsData = require('./chats.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        posts: new PostsData(db),
        chats: new ChatsData(db),
    });
};

module.exports = { init };
