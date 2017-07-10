const config = require('./config');
const browser = require('openurl');

Promise.resolve()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () => console.log('Port: ' + config.port));
        browser.open(`http://localhost:${config.port}`);
    });

