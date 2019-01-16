const express = require('express');
const app = express();
const routerConfig = require('./config/router-config.js');
const appConfig = require('./config/main-config.js');

appConfig.init(app, express);
routerConfig.init(app);

module.exports = app;