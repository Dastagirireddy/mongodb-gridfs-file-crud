'use strict';
let mongoose = require('mongoose');
let Grid = require('gridfs-stream');
let fs = require('fs');

mongoose.Promise = Promise;
Grid.mongo = mongoose.mongo;

class Doc {
    constructor() {
        this.mongoUrl = process.env.MONGO_DB || 'mongodb://localhost:27017/docs';
        this.connect();
    }

    connect() {
        let conn = mongoose.createConnection(this.mongoUrl);
        this.gfs = Grid(conn.db);
    }

    save(file, callback) {

        let writestream = this.gfs.createWriteStream({
            filename: new Date().getTime() + '-' + file.name
        });

        fs.createReadStream(file.path).pipe(writestream);

        writestream.on('close', (file) => {

            callback(null, file);
        });

        writestream.on('error', (err) => {

            callback(err, null);
        });
    }

    findByName(req, res) {

        var file = req.params.doc;

        var readstream = this.gfs.createReadStream({
            filename: file
        });

        readstream.pipe(res);
    }

    findAll(callback) {

        this.gfs.files.find({}).toArray(function(err, files) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, files);
        });
    }

    findByNameAndRemove(req, res) {

        let file = req.params.doc;

        this.gfs.remove({
            filename: file
        }, function(err) {
            if (err) return res.send(err);
            res.redirect('/')
        });
    }

    findByNameAndDownload(req, res) {

        var file = req.params.doc;

        var readstream = this.gfs.createReadStream({
            filename: file
        });

        res.setHeader('Content-disposition', 'attachment; filename=' + file);

        readstream.pipe(res);
    }
}

module.exports = new Doc();
