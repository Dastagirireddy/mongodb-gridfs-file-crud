'use strict';
let express = require('express');
let router = require('./router');
let api = require('./api');

class App {
    constructor() {
        this.app = express();
        this.config();
    }

    config() {
        this.app.set('views', __dirname + '/../views');
        this.app.set('view engine', 'ejs');
        this.app.use(express.static(__dirname + '/../assests'));
        this.app.use(router);
        this.app.use('/api/v1', api);
    }
}

module.exports = new App().app;
