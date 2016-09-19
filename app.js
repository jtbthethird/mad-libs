require('dotenv').config();

var express = require('express');
var app = express();
var madlibs = require('./madlibs.json');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/madlib', function (req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    var index = Math.floor(Math.random() * madlibs.length);
    var result = madlibs[index];
    res.send(result);
});

app.listen(app.get('port'), function () {
    console.log('Madlibs listening on port ' + app.get('port') + '!');
});
