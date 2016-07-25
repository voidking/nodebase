seajs.use(['jquery','layer','swiper'],function($,layer,swiper){
	var index = {
		init: function(){		
			this.bindEvent();
		},
		bindEvent: function(){
			layer.alert('test');
			console.log(layer);
			var temp = (window.localStorage && window.localStorage.aijiaOneYuan)?JSON.parse(window.localStorage.aijiaOneYuan):{}
			var unionid = temp.unionid;
			console.log(unionid);
		}
	};
	index.init();
});
