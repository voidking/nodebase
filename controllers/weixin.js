/**
 * Created by haojin on 2016/4/27 0027.
 */

var config = require('../config');
var wechat = require('wechat');
var urlencode = require('urlencode');
var eventproxy = require('eventproxy');
var request = require('request');

var WechatAPI    = require('wechat-api');

var WXapi = new WechatAPI(config.weixin.appid, config.weixin.appsecret);

// 微信
exports.home = function(req, res){
    // 获取code
    var subscribe = 1;
    if(!req.query.code){
        var r_url = config.host+'/weixin/home';
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.weixin.appid+'&redirect_uri='+urlencode(r_url)+'&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect';
        res.redirect(url);
    }else{
        // 未关注用户的
        var code = req.query.code;
        var state = req.query.state;
        // 通过code换取网页授权access_token
        var params = {
            appid:config.weixin.appid,
            secret:config.weixin.appsecret,
            code:code,
            grant_type:'authorization_code'
        };
        
        var ep = new eventproxy();
        ep.all('shareConfig','userInfo',function(shareConfigData,userInfoData){
            console.log(shareConfigData);
            console.log(userInfoData);
            var shareData = {
                enable: true,
                title: '艾佳生活送你2G流量，先到先得，快来抢吧！',
                icon: 'http://7vilis.com1.z0.glb.clouddn.com/image/flowrate/share.jpg',
                desc: '我在艾佳生活抢到了2G流量，百万流量送送送，赶紧加入全民疯抢趴！',
                mUrl: config.host+'/flowrate/share?openid=000&nickname=voidking&num=10',
                url: config.host + '/weixin/home?code='+code+'&state='+state
            };
            res.render('./weixin/home',{
                title: '微信',
                host: config.host,
                shareConfigData: shareConfigData,
                shareData: shareData,
                userInfoData: JSON.parse(userInfoData)
            });
        });

        var param = {
            debug: false,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            url: req.protocol+"://"+req.hostname+req.originalUrl
        };     
        WXapi.getJsConfig(param, function(err,result){
            ep.emit('shareConfig',result);    
        });

        // 通过code换取网页授权access_token
        var params = {
            appid:config.weixin.appid,
            secret:config.weixin.appsecret,
            code:code,
            grant_type:'authorization_code'
        };
        var getAccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+params.appid+'&secret='+params.secret+'&code='+params.code+'&grant_type='+params.grant_type;
        request.get(getAccessTokenUrl,function(error, response, body){
            if (!error && response.statusCode == 200) {
                var re = JSON.parse(response.body);
                console.log(re);
                var getuserinfo = 'https://api.weixin.qq.com/sns/userinfo?access_token='+re.access_token+'&openid='+re.openid+'&lang=zh_CN';
                request.get(getuserinfo,function(error2, response2, body2){
                    if (!error2 && response2.statusCode == 200) {
                        ep.emit('userInfo',response2.body);
                    }
                });
            }
        });
    }
}

exports.userinfo = function(req, res){
    
    function getArg(str,arg) {
        var reg = new RegExp('(^|&)' + arg + '=([^&]*)(&|$)', 'i');
        var r = str.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    String.prototype.replaceAll  = function(s1,s2){     
        return this.replace(new RegExp(s1,"gm"),s2);     
    } 

    var str = decodeURI(req.url.split('?')[1]);
    console.log(str);
    str = str.replaceAll('&amp%3B','&');
    str = str.replaceAll('&amp;','&');
    console.log(str);
    var name = getArg(str,'name');
    console.log(name);
    res.render('weixin/userinfo',{
        title: '用户信息',
        host: config.host
    });
}