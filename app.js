/**
 * Created by haojin on 2016/3/20 0020.
 */
var express = require('express');
var port = process.env.PORT || 80;
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config');
var webRouter = require('./web-router');

app.use(session({
    secret: config.cookieSecret,
    key: config.key,//cookie name
    cookie:{maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        url: 'mongodb://localhost/forum'
    }),
    resave:true,
    saveUninitialized: true
}));

app.set('views','./views');// 页面目录配置
app.set('view engine', 'html');// ejs文件以html结尾
app.engine('html', require('ejs-mate'));
app.use(flash());// 消息通知
app.use(bodyParser.json({limit: '50mb'}));// ajax请求时data的大小限制
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

// 把文件夹中的内容添加到网站主目录下，静态文件务必添加，否则访问不到
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);

var socket_event = require('./socket-event');

io.on('connection', socket_event);

http.listen(port);

console.log('forum started at port:'+port);