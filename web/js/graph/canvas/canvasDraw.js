import * as dataParser from "js/graph/dataProcessor.js";
import {Chart} from "js/graph/canvas/chart.js";



export function createChart(rawData) {


	console.dir("- S T A R T -");

	var textLines = dataParser.textToLines(rawData);
	var chartData = dataParser.linesToGraphObjects(textLines);

	console.dir(chartData);


	var canvas = document.getElementById('demoCanvas');
	var context = canvas.getContext('2d');
	context.default = 	function() {
							context.lineWidth = 1;
							context.setLineDash([]);
							context.strokeStyle = '#000000';
							context.font = '14pt Arial';
						}

	var chart = new Chart();
	chart.init(context, chartData);

	chart.drawGrid(5);
	chart.drawTree();



	// console.dir("-- Draw Nodes --");
	// for (var l in chartData.levels) {

	// 	var nodes = chartData.levels[l];

	// 	for (var i=0; i<nodes.length; i++) {
	// 		var node = nodes[i];
	// 		var cartNode = new RectNode(context, chart, l, i, node.label);
	// 		cartNode.draw();

	// 		console.dir(cartNode.getTop());
	// 	}
	// }
}
