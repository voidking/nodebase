/**
 * Created by haojin on 2016/4/27 0027.
 */

var config = require('../config');
var mymodule = require('./mymodule');

exports.caculate = function(req, res){
    var num = mymodule.delete(5,4);
    console.log(num);
}

// socket.io
exports.chat = function(req, res){
    res.render('./test/chat',{
        title: '聊天',
        host: config.host
    });
}

// 百度地图
exports.baidu_map = function(req, res){
    res.render('./test/baidu-map',{
        title: '百度地图'
    });
}

// 分享
exports.share = function(req, res){
    res.render('./test/share',{
        title: '分享'
    });
}
