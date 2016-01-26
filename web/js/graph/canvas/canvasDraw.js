import {Chart} from "js/graph/canvas/grid.js";
import {RectNode} from "js/graph/canvas/elements/node.js";


export function canv(chartData) {


	console.dir("- S T A R T -");
	console.dir(chartData);


	var canvas = document.getElementById('demoCanvas');
	var context = canvas.getContext('2d');
		context.chart = new Chart();
		context.chart.init(chartData, canvas.width, canvas.height);
		context.default = 	function() {
								context.lineWidth = 1;
								context.setLineDash([]);
								context.strokeStyle = '#000000';
								context.font = '14pt Arial';
							}

		context.chart.drawGrid(context, 5);



	console.dir("-- Draw Nodes --");
	for (var l in chartData.levels) {

		var nodes = chartData.levels[l];

		for (var i=0; i<nodes.length; i++) {
			var node = nodes[i];
			var cartNode = new RectNode(context, l, i, node.label);
			cartNode.draw();

			console.dir(cartNode.getTop());
		}
	}
}
