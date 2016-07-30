/**
 * Created by haojin on 2016/4/27 0027.
 */

var config = require('../config');
var wechat = require('wechat');
var urlencode = require('urlencode');
var eventproxy = require('eventproxy');
var request = require('request');
var fs = require('fs');
var path = require('path');

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
        
        var ep = new eventproxy();
        ep.all('shareConfig','userInfo',function(shareConfigData,userInfoData){
            console.log(shareConfigData);
            console.log(userInfoData);
            var shareData = {
                enable: true,
                title: '分享',
                icon: 'http://7oxjrx.com1.z0.glb.clouddn.com//imgs/head.jpg',
                desc: '没见过这么拉风的分享描述吧！',
                mUrl: config.host+'/weixin/userinfo?openid=000&nickname=voidking&num=10'
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

exports.love = function(req, res){
    
    var ep = new eventproxy();
    ep.all('count',function(countData){
        res.render('weixin/love',{
            title: '七夕礼物测试活动',
            host: config.host,
            countData: JSON.parse(countData)
        });
    });

    fs.readFile(path.join(__dirname,'../public/data/count.json'),{encoding:'utf-8'},function(error, data){
        //console.log(data);
        ep.emit('count',data);
    });
    
}

exports.result = function(req, res){
    var gendar = req.body.gendar;
    var month = parseInt(req.body.month);
    var day = parseInt(req.body.day);
    var single = req.body.single;
    var param = '';
    var sub_param = '';
    var star = '';
    var sex = '';
    var state = '';
    // 给star赋值
    if(month==1 && day>=20 || month==2 && day<=18){
        star = '水瓶座';
    }else if(month==2 && day>=19 || month==2 && day<=20){
        star = '双鱼座';
    }else if(month==3 && day>=21 || month==4 && day<=19){
        star = '白羊座';
    }else if(month==4 && day>=20 || month==5 && day<=20){
        star = '金牛座';
    }else if(month==5 && day>=21 || month==6 && day<=21){
        star = '双子座';
    }else if(month==6 && day>=22 || month==7 && day<=22){
        star = '巨蟹座';
    }else if(month==7 && day>=23 || month==8 && day<=22){
        star = '狮子座';
    }else if(month==8 && day>=23 || month==9 && day<=22){
        star = '处女座';
    }else if(month==9 && day>=23 || month==10 && day<=23){
        star = '天秤座';
    }else if(month==10 && day>=24 || month==11 && day<=22){
        star = '天蝎座';
    }else if(month==11 && day>=23 || month==12 && day<=21){
        star = '射手座';
    }else if(month==12 && day>=22 || month==1 && day<=19){
        star = '摩羯座';
    }
    // 给sex赋值
    if(gendar == 'male'){
        sex = '男';
    }else if(gendar == 'female'){
        sex = '女';
    }
    // 给state赋值
    if(single == 'yes'){
        state = '单';
    }else if(single == 'no'){
        state = '恋';
    }
    // 给param赋值
    param = star + sex + state;
    sub_param = sex + state;

    var ep = new eventproxy();
    ep.all('gift',function(giftData){
        var giftList = JSON.parse(giftData).giftList;
        //console.log(giftList);
        var gift = {};
        for (var i = 0; i < giftList.length; i++) {
            if(sub_param == giftList[i].param){
                gift = giftList[i];
            }else if(param == giftList[i].param){
                gift = giftList[i];
            }
        }
        var shareData = {
            enable: true,
            title: '艾佳生活送你2G流量，先到先得，快来抢吧！',
            icon: 'http://7vilis.com1.z0.glb.clouddn.com/image/flowrate/share.jpg',
            desc: '我在艾佳生活抢到了2G流量，百万流量送送送，赶紧加入全民疯抢趴！',
            mUrl: config.host+'/flowrate/share?openid=000&nickname=voidking&num=10'
        };
        res.render('weixin/result',{
            title: '七夕礼物测试活动',
            host: config.host,
            gift: gift
        });
        fs.readFile(path.join(__dirname,'../public/data/count.json'),{encoding:'utf-8'},function(error, data){
            //console.log(data);
            var count = parseInt(JSON.parse(data).count);
            count++;
            var countData = {
                count: count
            };
            fs.writeFile(path.join(__dirname,'../public/data/count.json'),JSON.stringify(countData),function(error){
                console.log('success');
            });
        });
        
    });
    
    var url = config.host + '/data/gift.json';
    request.get({url: url},function(error, response, body){
        // console.log(response.body)
        ep.emit('gift',response.body);
    });
}

