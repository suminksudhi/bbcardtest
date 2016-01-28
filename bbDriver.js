var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app/routes/index'),
    shopalystBufferRoute = require('./app/routes/shopalyst');

var bbDriver = express(),
    util = require('./app/modules/util'); //get the options from the package.json



// view engine setup
bbDriver.set('trust proxy', ['loopback','127.0.0.1']) ;
bbDriver.set('views', path.join(__dirname, 'views'));
bbDriver.engine('html', require('ejs').renderFile);
bbDriver.set('view engine', 'html');



// uncomment after placing your favicon in /public
//bbDriver.use(favicon(path.join(__dirname, 'assets/img/common/favicon.ico')));
bbDriver.use(logger('dev'));
bbDriver.use(bodyParser.json());
bbDriver.use(bodyParser.urlencoded({extended: false}));
bbDriver.use(cookieParser());
//bbDriver.use(require('less-middleware')(path.join(__dirname, 'public')));
bbDriver.use(express.static(path.join(__dirname, 'assets')));

bbDriver.use(function(req,res,next){
    util.getProperties(function(data){
        req.property = data;
        next();
    });
});

//initialize all routers
bbDriver.use('/', routes);
bbDriver.use('/shopalyst', shopalystBufferRoute);

// catch 404 and forward to error handler
bbDriver.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (bbDriver.get('env') === 'development') {
    bbDriver.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err)
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    bbDriver.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


module.exports = bbDriver;
