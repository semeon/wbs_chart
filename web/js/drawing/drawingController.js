import {Chart} from "js/drawing/view/chart.js";



export function Drawing(m) {

	var textLines = [];
	var chartData = {};
	var canvas = {};
	var context = {};
	var chart = {};
	var model = m;

	chart = new Chart();

	this.resetCanvas = function(nodeId) {
		
		canvas = document.getElementById(nodeId);
		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.default = 	function() {
								context.lineWidth = 1;
								context.setLineDash([]);
								context.strokeStyle = '#000000';
								context.font = '14pt Arial';
							}

	}

	this.resetChart = function(rawData) {
		model.reset(rawData);
		chartData = model.getData();
		chart.init(chartData);
	}

	this.drawChart = function() {
		chart.drawNodes(context);
	}

	this.getChartWidth = function() {
		return chart.getWidth();
	}
}
