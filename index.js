var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.listen(9000, function () {
    console.log('App listening on port 80');
});