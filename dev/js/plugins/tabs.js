(function($) {

	$.fn.tabs = function(prop) {
		$('.tabs').click(function(event) {
				var currentItem = $(this);

				currentItem.siblings().removeClass('active');
				currentItem.addClass('active');

				if(prop == 'reports') {
					var chartName = currentItem.attr('id');
					$('.reports').html(ReportsModel(chartName));
				} else {
					EventBus.trigger('routeChange', currentItem.find('a').attr('href'));
				}
			});
		return this;
	};
}(jQuery));