seajs.use(['jquery'],function($){
    var index = {
        init:function(){
            this.saveData();
            this.bindEvent();
        },
        saveData: function(){
            if(window.localStorage){
                var x = window.localStorage.aijiaOneYuan? JSON.parse(window.localStorage.aijiaOneYuan):{};
                if((x.unionid == undefined) || (x.unionid == "undefined")){
                    var temp = {
                        unionid: $('#unionid').val(),
                        openid: $('#openid').val(),
                        nickname: $('#nickname').val(),
                        headimgurl:$ ('#headimgurl').val()
                    };
                    window.localStorage.aijiaOneYuan = JSON.stringify(temp);
                }
            }
        },
        bindEvent:function(){
        }
    }
    index.init();
});