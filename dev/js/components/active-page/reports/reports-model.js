/*
function ReportsModel(chartName) {
	var chartCommon = Highcharts.chart('container', {
		chart: {
			backgroundColor: "#2a3f50",
		},
    credits: {enabled: false},
    tooltip: {
      pointFormat: '{series.name}</b>',
      backgroundColor: '#cedeea',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'rgba(84, 108, 126, 0.7)',
      style : {
        'color': '#3c5162',
        'font-family': 'robotobold',
        'font-size': '12px',
        'padding': '10px 15px'
      }
	  }
	});
	var dayChart = Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Total',
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    fontSize: '14px',
                    color: '#fff'
                } 
            },
            height: "100%",
            width: "100%",
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: -30,
                        format: '<b>{point.name}</b>',
                        style: {                        
                            fontWeight: 'bold',                        
                            color: 'white',                        
                            textShadow: false,                        
                            fontSize: '14px',                        
                            borderColor: 'none'                   
                        }
                    },
                    showInLegend: false,
                }
            },
            series: [{
                name: 'Priority',
                colorByPoint: true,
                data: [{
                    name: 'High',
                    color: '#ffa841',
                    y: 4
                }, {
                    name: 'Middle',
                    color: '#fddc43',
                    y: 3
                }, {
                    name: 'Low',
                    color: '#1abc9c',
                    y: 2
                }, {
                    name: 'Urgent',
                    color: '#e16c65',
                    y: 1
                }, {
                    name: 'Failed',
                    color: '#8da5b8',
                    y: 3
                }],
                innerSize: '50%'
            }]
        });
    var weekChart = Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            legend: {
                symbolRadius:0,
                itemStyle: {
                    "color": "#8da5b8"
                },
                itemHoverStyle: {                
                    color: '#fff'            
                }
            },
            xAxis: {
                categories: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },
                lineColor: "#fff",
                lineWidth: 1,
                tickColor: 'transparent'
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                tickInterval: 2,
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },
                gridLineColor: "#8da5b8",
                title: {
                    text: ''
                },
                lineWidth: 1,            
                lineColor: '#fff'
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Urgent',
                data: [1, 2, 3, 1, 2],
                color: '#e16c65',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'High',
                data: [3, 2, 0, 2, 2],
                color: '#ffa841',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Middle',
                data: [2, 3, 0, 2, 1],
                color: '#fddc43',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Low',
                data: [3, 0, 2, 2, 1],
                color: '#1abc9c',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Failed',
                data: [1, 2, 5, 1, 3],
                color: '#8da5b8',
                stack: 'failed',
                borderWidth: 0
            }]
        });
    var monthChart = Highcharts.chart('container', {
            xAxis: {
                categories: ['1','2','3','4','5','6','7','8','9','10',
                            '11','12','13','14','15','16','17','18','19','20',
                            '21','22','23','24','25','26','27','28','29','30'],
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },
                lineColor: "#fff",
                lineWidth: 1,
                tickColor: 'transparent'
            },
            series: [{
                name: 'Urgent',
                data: [1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2],
                color: '#e16c65',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'High',
                data: [3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2],
                color: '#ffa841',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Middle',
                data: [2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1],
                color: '#fddc43',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Low',
                data: [3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1],
                color: '#1abc9c',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Failed',
                data: [1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3],
                color: '#8da5b8',
                stack: 'failed',
                borderWidth: 0
            }]
        });
    
	var chart = $.extend({}, chartCommon, chartName);
	console.log(chart);


	return chart;
}*/
