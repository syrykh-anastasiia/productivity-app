(function($) {

	$.fn.tooltips = function(prop) {
		$('a.tooltip').each(function(i) {
			$('body').append('<div class="tooltips-block" id="' + i + '"><p>' + $(this).attr("title") + '</p></div>');

			var activeTip = $('#'+i);
			
			$(this).removeAttr('title').mouseover(function() {
				activeTip.css({opacity: 0.8, display: 'none'}).fadeIn(400);
			}).mousemove(function(kmouse) {
				activeTip.css({left:kmouse.pageX-15, top:kmouse.pageY+25});
			}).mouseout(function() {
				activeTip.fadeOut(400);
			});
		});
		return this;
	};
}(jQuery));