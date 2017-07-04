var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    browser = require('openurl');

// TODO: connect mongodb

var models = glob.sync(config.root + '/app/Models/*.js');
models.forEach(function (model) {
    require(model);
});

var app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
    browser.open("http://localhost:" + config.port);
});