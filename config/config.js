var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'NodeJsTeamWork'
        },
        port: 3000,
        db: 'mongodb://localhost/NodeJsTeamWork-development'
    }
};

module.exports = config[env];