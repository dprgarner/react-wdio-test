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
function loadComments() {
    return fs.access(COMMENTS_FILE, fs.F_OK)
        .then(() => fs.readFile(COMMENTS_FILE))
        .catch(function (err) {
            if (err.code === 'ENOENT') return Promise.resolve('[]');
            throw err;
        });
}

app.get('/api/comments', function (req, res) {
    loadComments()
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
    loadComments()
        .then(function (data) {
            newComment = {
                id: Date.now(),
                author: req.body.author,
                text: req.body.text,
            };
            comments = JSON.parse(data);
            comments.push(newComment);
            return fs.writeFile(
                COMMENTS_FILE, JSON.stringify(comments, null, 2)
            );
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