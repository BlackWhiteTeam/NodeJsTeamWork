/* globals __dirname */

const express = require('express');
const path = require('path');
const helpers = require('./helpers');

const init = (data) => {
    const app = express();
    const controllers = require('./controllers')(data, helpers);

    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));
    app.use(express.static(path.join(__dirname, '../public/')));

    require('./config').attachTo(app);
    require('./auth').attachTo(app, data.users);
    require('./routers').attachTo(app, controllers);

    return Promise.resolve({ server: app, data: data });
};

module.exports = { init };
