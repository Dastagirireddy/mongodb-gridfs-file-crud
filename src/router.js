'use strict';
let router = require('express').Router();
let doc = require('./docs/doc');

class Router {
    constructor() {
        this.router = router;
        this.init();
    }

    init() {
        this.router.get('/', (req, res) => {

            doc.findAll((err, docs) => {
                res.render('index', {
                    docs: docs
                });
            });
        });
    }
}

module.exports = new Router().router;
