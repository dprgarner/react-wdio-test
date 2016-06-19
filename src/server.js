// import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import promisify from 'promisify-node';

let app = express();
let fs = promisify('fs');
const COMMENTS_FILE = path.join(__dirname, '..', 'comments.json');
const PORT = 80;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Disable caching
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Creates empty comments file if it doesn't exist
function checkFileExists(filePath) {
    return fs.access(filePath, fs.F_OK).catch(function (err) {
        if (err.code !== 'ENOENT') throw err;
        return fs.writeFile(COMMENTS_FILE, '[]', 'utf8');
    });
}

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
    let comments, newComment;
    checkFileExists(COMMENTS_FILE)
        .then(() => fs.readFile(COMMENTS_FILE))
        .then(function (data) {
            newComment = {
                id: Date.now(),
                author: req.body.author,
                text: req.body.text,
            };
            comments = JSON.parse(data);
            comments.push(newComment);
            return fs.writeFile(COMMENTS_FILE, JSON.stringify(comments));
        })
        .then(function () {
            console.log(newComment);
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