(function($) {
	$.fn.accordion = function() {
        $('.drop').slideUp();
		$(this).on('click', '.opener', function() {
            $(this).parent().toggleClass('active');
            $(this).siblings('.drop').slideToggle();
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

	$.fn.modalWindow = function() {
		var modal = $(this);
		$('.add-task, .edit-task, .remove-task').on('click', function(e) {
			e.preventDefault();
            EventBus.trigger('updateModalMode', $(this));
            modal.addClass('modal-open');
		});

        $('.modal-btns button').on('click', function() {
            modal.removeClass('modal-open');
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