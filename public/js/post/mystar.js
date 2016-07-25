/**
 * Created by haojin on 2016/3/20 0020.
 */
seajs.use(['jquery','layer'],function($,layer){
	var mystar = {
		init: function(){
			var error = $('#error').val();
			if(error){
			    layer.alert(error, {
			        skin: 'layui-layer-lan' //样式类名
			        ,closeBtn: 0
			    });
			}
			this.bindEvent();
		},
		bindEvent: function(){

		}
	};
	mystar.init();
});