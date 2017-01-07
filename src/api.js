'use strict';
let router = require('express').Router();
let docRouter = require('./docs/router');

class Api {
    constructor() {
        this.router = router;
        this.init();
    }

    init() {
        this.router.use('/docs', docRouter);
    }
}

module.exports = new Api().router;
