import {Chart} from "js/drawing/view/chart.js";



export function Drawing(m) {

	var self = this;

	var textLines = [];
	var chartData = {};
	var canvas = {};
	var context = {};
	var chart = {};
	var model = m;
	var canvasNodeId = "";

	chart = new Chart();

	this.init = function(nodeId) {
		console.dir("Init Drawing");
		canvasNodeId = nodeId;
		console.dir("End Init Drawing");
	}

	this.getCanvasNodeId = function() {
		return canvasNodeId;
	}

	this.resetCanvas = function() {
		console.dir("resetCanvas");
		console.dir("canvasNodeId: " + canvasNodeId);

		canvas = document.getElementById(canvasNodeId);
		context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.default = 	function() {
								context.lineWidth = 1;
								context.setLineDash([]);
								context.strokeStyle = '#000000';
								context.font = '14pt Arial';
							}

		console.dir("end resetCanvas");

	}

	this.resetChartModel = function(rawData) {
		console.dir("resetChart");
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
