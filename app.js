const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const browser = require('openurl');

// TODO: connect mongodb

const models = glob.sync(config.root + '/app/Models/*.js');
models.forEach(function(model) {
    require(model);
});

const app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
    browser.open('http://localhost:' + config.port);
});
