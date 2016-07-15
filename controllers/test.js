/**
 * Created by haojin on 2016/4/27 0027.
 */

// 截图
exports.cropper = function(req, res){
    res.render('./test/cropper',{

    });
}

// socket.io
exports.chat = function(req, res){
    res.render('./test/chat',{
        title: '聊天'
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

// 分页
exports.page = function(req, res){
    res.render('./test/page',{
        title: '分页'
    });
}

// 表情
exports.emoji = function(req, res){
    res.render('./test/emoji',{
        title: '表情'
    });
}

// css translate属性
exports.translate = function(req, res){
    res.render('./test/translate',{
        title: 'translate属性'
    });
}
