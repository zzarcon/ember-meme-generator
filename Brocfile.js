/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/normalize.css/normalize.css');

// app.import('bower_components/select3/dist/select3-full.css');
// app.import('bower_components/select3/dist/select3-full.js');

module.exports = app.toTree();