const config = require('./config');
const browser = require('openurl');

Promise.resolve()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        // refactor
        // eslint-disable-next-line
        const http = require('http').Server(app);
        const io = require('socket.io')(http);

        io.on('connection', (socket) => {
            socket.on('chat message', (msg) => {
                io.emit('chat message', msg);
            });
        });
        http.listen(config.port, () => console.log('Port: ' + config.port));

        browser.open(`http://localhost:${config.port}`);
    });

