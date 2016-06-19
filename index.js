import express from 'express';
import bodyParser from 'body-parser';

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var port = 80;

app.use(express.static('public'));

app.post('/api', urlEncodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.send(`Welcome ${req.body.username}!`);
});

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});