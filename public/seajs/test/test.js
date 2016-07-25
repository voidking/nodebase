define(function(require, exports, module){
	return function(jQuery){
		(function($){
			console.log('test');
		})(jQuery);
		jQuery.extend({
			printhello: function(){
				console.log('hello');
			}
		});
		jQuery.fn.extend({
			printhello: function(){
				console.log('hello fn');
			}
		});
	}
});