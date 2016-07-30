seajs.use(['jquery','layer'],function($,layer){
	var index = {
		init: function(){		
			this.bindEvent();
		},
		bindEvent: function(){
			var temp = (window.localStorage && window.localStorage.aijiaOneYuan)?JSON.parse(window.localStorage.aijiaOneYuan):{}
			var unionid = temp.unionid;
			console.log(unionid);
		}
	};
	index.init();
});
