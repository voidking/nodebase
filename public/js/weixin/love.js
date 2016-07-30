seajs.use(['jquery','layer','template'],function($,layer,template){
	var index = {
		init: function(){
			var self = this;	
			self.bindEvent();
			self.changeDay();
			self.selectMonth2();
			self.changeDay2();
			self.selectDay2();
		},
		bindEvent: function(){
			var self = this;
			$('#month').change(function(){
				self.changeDay();
			});
		},
		changeDay: function(){
			var $day = $('#day');
			var month = $('#month').val();
			var data = [];			
			if(month==2){
				for (var i = 1; i <= 29; i++) {
					data.push(i);
				}
			}else if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
				for (var i = 1; i <= 31; i++) {
					data.push(i);
				}
			}else if(month==4 || month==6 || month==9 || month==11){
				for (var i = 1; i <= 30; i++) {
					data.push(i);
				}
			}
			var html = '';
			data.forEach( function(element, index) {
				html += '<option value='+element+'>'+element+'</option>';
			});
			$day.html(html);
			$day.find('option').first().checked;
		},
		selectMonth2: function(){
			var self = this;
			var $month = $('#month-box');
			$('#month-box').on('click','.check',function(event){
				$('#day-box').find('.items').removeClass('active');
				if($month.find('.items').hasClass('active')){
					$month.find('.items').removeClass('active');
				}else{
					$month.find('.items').addClass('active');
				}
				event.stopPropagation();
			});
			$('#month-box').on('click','li',function(){
				var month = $(this).html();
				$month.find('.input').val(month);
				$month.find('.check').html(month);
				$month.find('.items').removeClass('active');

				self.changeDay2();
			});
			$(document).click(function(){
				$month.find('.items').removeClass('active');
			});
		},
		changeDay2: function(){
			var $month = $('#month-box');
			var $day = $('#day-box');
			var month = $month.find('.input').val();
			var data = [];		
			if(month==2){
				for (var i = 1; i <= 29; i++) {
					data.push(i);
				}
			}else if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
				for (var i = 1; i <= 31; i++) {
					data.push(i);
				}
			}else if(month==4 || month==6 || month==9 || month==11){
				for (var i = 1; i <= 30; i++) {
					data.push(i);
				}
			}
			var html = '';
			data.forEach( function(element, index) {
				html += '<li>'+element+'</li>';
			});
			$day.find('.items').html(html);
			$day.find('.check').html('1');
		},
		selectDay2: function(){
			var $day = $('#day-box');
			$('#day-box').on('click','.check',function(event){
				$('#month-box').find('.items').removeClass('active');
				if($day.find('.items').hasClass('active')){
					$day.find('.items').removeClass('active');
				}else{
					$day.find('.items').addClass('active');
				}
				event.stopPropagation();
			});
			$('#day-box').on('click','li',function(){
				var day = $(this).html();
				$day.find('.input').val(day);
				$day.find('.check').html(day);
				$day.find('.items').removeClass('active');
			});
			$(document).click(function(){
				$day.find('.items').removeClass('active');
			});
		}
	};
	index.init();
});
