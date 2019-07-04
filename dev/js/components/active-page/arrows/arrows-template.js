function ArrowsTemplate() {
  this.template = '<div class="arrow">' +
		'<button class="arrows arrow-left"><a class="tooltip" title="Go To Task List"><i class="icons icon-arrow-left"></i></a></button>' +
		'<button class="arrows arrow-right"><i class="icons icon-arrow-right"></i></button>' +
	'</div>';
}
ArrowsTemplate.prototype.show = function() {
	return this.template;
}