import express from 'express';
import bodyParser from 'body-parser';

let app = express();
let urlEncodedParser = bodyParser.urlencoded({extended: false});
const PORT = 80;

app.use(express.static('public'));

app.post('/api', urlEncodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.send(`Welcome ${req.body.username}!`);
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
});