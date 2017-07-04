/* global __dirname */

const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = 'development';


const config = {
    development: {
        root: rootPath,
        app: {
            name: 'NodeJsTeamWork',
        },
        port: 3000,
        db: 'mongodb://localhost/NodeJsTeamWork-development',
    },
};

module.exports = config[env];
