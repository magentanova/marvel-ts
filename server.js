// express stuff
const express = require('express');
const app = express();
const apiRouter = express.Router();

// outgoing requests
const request = require('superagent');

// for to hashing
const PRIVATE_KEY = require('./secrets.js').private_key;
const PUBLIC_KEY = require('./secrets.js').public_key;
const md5 = require('md5');

// table wine
const PORT = process.env.PORT || 5000;

const MARVEL_API_BASE = "https://gateway.marvel.com/v1/public"

// ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150"

apiRouter.get('*',function(req,resp, next) {
    var ts = new Date().getTime();
    request
        .get(MARVEL_API_BASE + req.url)
        .query({
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY),
            orderBy: '-modified'
        })
        .then(function(marvel_resp) {
            resp.json(marvel_resp.body)
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        });
});

app.use('/api',apiRouter);
app.use(express.static(__dirname + '/public'));
app.listen(PORT, function() {
    console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
});