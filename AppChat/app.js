var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config'); // npm i nconf
var log = require('libs/log')(module);
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Midlware
app.set('port', config.get('port')); // Устанавливаем свойство для объекта app

app.set('views', path.join(__dirname, '/template'));
app.set('view engine', 'ejs'); // Указываем шаблонизатор

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(app.router);
app.get('/', function (req, res) {
    // res.end('test!!!');
    res.render('index', { title: 'DAKA'});
});



app.use(express.static(path.join(__dirname, 'public')));


app.use(function (err, req, res, next) {
    // NODE_ENV = 'production' , по умолчанию development
    if (app.get('env') === 'development') {
        res.send('Ошибка, мы находимся в режиме разработки');
        // app.use(errorHandler());
    } else {
        res.send(500);
    }
});



// app.use(bodyParser.urlencoded({ extended: false }));
//
//

// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

http.createServer(app).listen(app.get('port'), function () {
    log.info('Express сервер слушает на ' + app.get('port'));
});