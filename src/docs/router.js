'use strict';
let router = require('express').Router();
let multiparty = require('connect-multiparty');
let multipartMiddleware = multiparty();
let doc = require('./doc');

class Router {
    constructor() {
        this.router = router;
        this.init();
    }

    init() {
        this.router.get('/:doc', (req, res) => {

            doc.findByName(req, res);
        });

        this.router.get('/delete/:doc', (req, res) => {

            doc.findByNameAndRemove(req, res);
        });

        this.router.get('/download/:doc', (req, res) => {

            doc.findByNameAndDownload(req, res);
        });

        this.router.post('/upload', multipartMiddleware, (req, res) => {

            let files = req.files;
            let key = Object.keys(files)[0];

            doc.save(files[key], (err, doc) => {

                if (!err) {
                    res.redirect('/');
                } else {
                    res.statusCode = 500;
                    res.send(err);
                }
            });
        });
    }
}

module.exports = new Router().router;
