window.initHeader = function() {
	var headerView = new HeaderView();
	var headerController = new HeaderController(headerView);

    EventBus.on('renderHeader', function(holder) {
        headerView.render(holder);
    });
}