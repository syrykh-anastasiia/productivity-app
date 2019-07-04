function ReportsTemplate() {
  var template = renderTemplate();

  function renderTemplate() {
    return '<section class="content-area">' +
		'<header>' +
			'<h1 class="main-page-title">Report</h1>' +
		'</header>' +
		'<div class="upper-filter">' +
			'<button id="dayChart" class="tabs chart-tabs active">Day</button>' +
			'<button id="weekChart" class="tabs chart-tabs">Week</button>' +
			'<button id="monthChart" class="tabs chart-tabs">Month</button>' +
		'</div>' +
		'<div class="reports-area">' +
			'<div id="container" class="chart"></div>' +
		'</div>' +
		'<div class="bottom-filter">' +
			'<button class="tabs">Pomodoros</button>' +
			'<button class="tabs active">Tasks</button>' +
		'</div>' +
	'</section>';
  }
  return template;
}