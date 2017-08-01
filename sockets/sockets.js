/* eslint-disable max-len */
/* eslint-disable new-cap */

const init = (app) => {
    const http = require('http').Server(app.server);
    const io = require('socket.io')(http);

    io.on('connection', (socket) => {
        socket.on('show-messages', () => {
            return app.data.chats.getAll()
                .then((messages) => {
                    socket.emit('show-messages', messages);
                });
        });
        socket.on('send-message', ({ user, message }) => {
            return app.data.chats.create({ user, message })
                .then((chat) => {
                    io.emit('send-message', chat);
                });
        });
    });
    return Promise.resolve(http);
};

module.exports = {
    init,
};

