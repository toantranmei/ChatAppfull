const dependable = require("dependable");
const path = require("path");

const container = dependable.container();

const simpleDependecies = [
    ['_', 'lodash'],
    ['passport', 'passport']
];

simpleDependecies.forEach(function(val) {
    container.register(val[0], function() {
        return require(val[1]);
    });
});

//load modules
container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, 'helpers'));

// example
// const _ = require('lodash');

container.register('container', function() {
    return container;
});

module.exports = container;