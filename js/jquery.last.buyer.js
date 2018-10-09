var last_buyer = {
	set_interval : true,
	count : 0,
	init : function(){
		var clients = last_buyer.ajax_get_last_clients();
		if(clients){
			last_buyer.show_hide_process(clients);
		}
		$('select, input').on('focus', function() {
			if($(window).width()<=767){
				last_buyer.stop_process();
			}
		}); 
	},
	ajax_get_last_clients : function(){
		var data = {};
		data['country'] = processing.data.get_selected_country_el().val();
		data['action_buyer'] = 'get_buyers';
		var response = $.ajax({
			url: "include/classes/Class.LastBuyer.php", 
			dataType: "json",
			type: 'POST',
			data: data,
			async: false,
		});
		if(response.responseJSON){
			return response.responseJSON;
		}else{
			return false;
		}
	},
	change_client : function(clients){
		var clients = clients[last_buyer.count];
		if(clients){
			var country = clients['Country'];
			// $('[name="'+processing.country+'"] option').each(function(i,e){
			// 	if(country==$(e).val()){
			// 		country = $(e).text();
			// 	}
			// });

			$('.last-buyer-city').text(country);
			if(clients['first_paid_time_hours_ago']>0){
				$('.last-buyer-hours-text').removeClass('hidden');
				$('.last-buyer-mins-text').addClass('hidden');
				$('.last-buyer-hours').text(clients['first_paid_time_hours_ago']);
			}else{
				$('.last-buyer-mins-text').removeClass('hidden');
				$('.last-buyer-hours-text').addClass('hidden');
			}
			$('.last-buyer-box').addClass('active');
		}
	},
	show_hide_process : function(clients){
		if(last_buyer.count >= clients.length){
			last_buyer.set_interval = false;
		}
		if(last_buyer.set_interval){
			var max_sec = 30;
			var min_sec = 10;
			var time_sec_showing_delay = 5;
			var set_interval_time_sec = Math.floor(Math.random() * (max_sec - min_sec + 1) + min_sec);

			setTimeout(function() {
				last_buyer.change_client(clients);
				last_buyer.count += 1;
				if($('.last-buyer-box').hasClass('active')){
					setTimeout(function() {
						$('.last-buyer-box').removeClass('active');
						last_buyer.show_hide_process(clients);
					}, time_sec_showing_delay * 1000);
				}else{
					last_buyer.show_hide_process(clients);
				}
			}, set_interval_time_sec * 1000);
		}
	},
	stop_process : function(){
		if(last_buyer.set_interval){
			if($('.last-buyer-box').hasClass('active')){
				$('.last-buyer-box').removeClass('active');
			}
			last_buyer.set_interval = false;
		}
	},
};

$(function(){
	last_buyer.init();
})