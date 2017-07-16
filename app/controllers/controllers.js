/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.controller'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath);
        });
};

module.exports = { attachTo };
