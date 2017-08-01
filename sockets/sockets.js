/* eslint-disable max-len */
/* eslint-disable new-cap */

const init = (app) => {
    const http = require('http').Server(app.server);
    const io = require('socket.io')(http);

    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    });

    return Promise.resolve(http);
};

module.exports = {
    init,
};

