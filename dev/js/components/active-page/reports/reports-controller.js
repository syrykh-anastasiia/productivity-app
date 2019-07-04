function ReportsController() {
	location.hash = '#reports';
	document.title = 'Reports';

	ReportsView();

	$('.tabs').tabs('reports');
	$('.icons').tooltips();

	var controllers = document.getElementsByClassName('upper-filter')[0];
	var chartState = controllers.querySelector('.active');	
	var chart = chartState.id;

	ReportsModel(chart);
}