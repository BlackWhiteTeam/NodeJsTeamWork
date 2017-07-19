const init = (app) => {
    // eslint-disable-next-line
    const http = require('http').Server(app);
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

