'use strict';
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs= require('ejs');
const redisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const json2xls = require('json2xls'); //json转成Excel
var expressLayouts = require('express-ejs-layouts'); //layout for html 

const app = express();

//初始化全局对象依赖 
require('./dependency').init(); 

//配置
var config = moviepro.config;

//设置view模板
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(expressLayouts);
//指定全局的模板页面
app.set('layout', '_share/root')

//config session 
//使用redis存储session
// app.use(session({
//   store: new redisStore({
//     host: config.sessionRedisHost,
//     port: config.sessionRedisPort,
//     db: config.sessionRedisDb
//   }),
//   secret: config.sessionSecret,
//   resave: false,
//   saveUninitialized: true
// }));

//启用本地session缓存
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true 
}))

//中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(json2xls.middleware); //json转成Excel

// 静态化ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//静态化资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(flash());

//过滤器
//全局身份验证
// var authorizeFilter = moviepro.filters.authorize;
// app.use(function (req, res, next) {
//     authorizeFilter.isAuthentication(req, res,next);
// });

//路由
require('./routes/routes')(app);

// 404 handler
app.use(function (req, res, next) {
  res.status(404).render('error/404',{'title':'404页面'});
});

// 500 handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/500', {
      message: err.message,
      title:'500页面'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/500', {
    message: err.message,
    title:'500页面'
  });
});

module.exports = app;
