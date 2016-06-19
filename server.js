// import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import promisify from 'promisify-node';

let fs = promisify('fs');
let app = express();
const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const PORT = 80;

function checkFileExists(filePath) {
    return fs.access(filePath, fs.F_OK).catch(function (err) {
        if (err.code !== 'ENOENT') throw err;
        return fs.writeFile(COMMENTS_FILE, '[]', 'utf8');
    });
}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Disable caching
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function (req, res) {
    checkFileExists(COMMENTS_FILE)
    .then(() => fs.readFile(COMMENTS_FILE))
    .then(function (data) {
        res.json(JSON.parse(data));
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
});

app.post('/api/comments', function (req, res) {
    let comments;
    checkFileExists(COMMENTS_FILE)
    .then(() => fs.readFile(COMMENTS_FILE))
    .then(function (data) {
        comments = JSON.parse(data);
        comments.push({
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        });
        return fs.writeFile(COMMENTS_FILE, JSON.stringify(comments));
    })
    .then(function () {
        res.json(comments);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
});