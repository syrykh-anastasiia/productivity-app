(function($) {

	$.fn.accordion = function(prop) {
			$('.accordion-header').click(function(event) {
				var accordionHeader = $('.accordion-header');
				var accordionBody = $('.accordion-body');
		
				accordionBody.toggleClass('hidden');
			});
			
		return this;
	};
}(jQuery));
(function($) {
    $.fn.focus = function() {
        $(this).on('focusin', function() {
            $(this).parent('.category-input').addClass('focus');
        });
        $(this).on('focusout', function() {
            $(this).parent('.category-input').removeClass('focus');
        });
        return this;
    };
}(jQuery));
(function($) {

	$.fn.modal = function(prop) {
		var modalContainer = $('.modal');
		modalContainer.removeClass('hidden');

		$("#deadline").datepicker({
			showAnim: "slideDown",
	    	changeMonth: true,
	    	changeYear: true,
    		minDate: 0,
	    	dateFormat: "MM dd, yy"
		});

		$('#confirmAdding').click(function() {
			modalContainer.addClass('hidden');
		});
		$('#cancelAdding').click(function() {
			modalContainer.addClass('hidden');
		});
		return this;
	};
}(jQuery));
(function($) {
    $.fn.stickyHeader = function() {
        var sticky = $(this);
        $(window).on('scroll', function() {
            if($(window).scrollTop() > sticky.outerHeight()) {
                sticky.addClass('fixed');
            }
        });
        //console.log(this);
        //return this;
    };
}(jQuery));
(function($) {
	$.fn.tabs = function() {
		$(this + 'a').click(function(event) {
			event.preventDefault();
			console.log($(this));
		});
		return this;
	};
}(jQuery));
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