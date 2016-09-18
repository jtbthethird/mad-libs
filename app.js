var express = require('express');
var app = express();
var madlibs = require('./madlibs.json');

app.use(express.static('public'));

app.get('/madlib', function (req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    var index = Math.floor(Math.random() * madlibs.length);
    var result = madlibs[index];
    res.send(result);
});

app.listen(3000, function () {
    console.log("Starting with libs: " + madlibs);
    console.log('Madlibs listening on port 3000!');
});
