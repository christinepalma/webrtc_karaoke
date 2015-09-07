//BASE SETUP
//========================================


//CALLS PACKAGES
var express    = require('express');
var app        = express();

var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');

var config 	   = require('./config');
var path 	   = require('path');


// APP CONFIGURATION
//========================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//HANDLES CORS REQUESTS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


// LOGS ALL REQUESTS TO CONSOLE
app.use(morgan('dev'));


// CONNECT TO DATABASE
mongoose.connect(config.database);


// SETS STATIC FILES LOCATION
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));


//ROUTES FOR API
//========================================
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


// MAIN CATCHALL ROUTE / SEND USERS TO FRONTEND
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// STARTS THE SERVER
//========================================
app.listen(config.port);
console.log('Listening on port ' + config.port);



