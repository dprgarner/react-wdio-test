var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

app.post('/api', urlEncodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.send('Welcome ' + req.body.username);
});

var port = 9000;
app.listen(port, function () {
    console.log('App listening on port ' + port);
});