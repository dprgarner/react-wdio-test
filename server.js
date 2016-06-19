import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

let app = express();
const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const PORT = 80;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Disable caching
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function (req, res) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', function (req, res) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
});