import {Grid} from "js/graph/canvas/grid.js";
import {RectNode} from "js/graph/canvas/elements/node.js";


export function canv() {


	// Faking data
	var chartData = {};


	var canvas = document.getElementById('demoCanvas');
	var context = canvas.getContext('2d');
	context.grid = new Grid(chartData, canvas.width, canvas.height);

	console.dir("-- GRID --");
	console.dir("grid.canvasMidX(): " + context.grid.canvasMidX());
	console.dir("grid.levelHeight(): " + context.grid.levelHeight());
	console.dir("grid.levelTop(0): " + context.grid.levelTop(0));
	console.dir("grid.levelBottom(0): " + context.grid.levelBottom(0));
	console.dir("grid.levelBarBottom(0): " + context.grid.levelBarBottom(0));
	console.dir("grid.levelRowTop(0): " + context.grid.levelRowTop(0));
	console.dir("");


	var node0 = new RectNode(context, 1, 1, "Node 0");
	node0.draw();

	console.dir("-- NODE --");
	console.dir(node0.getTop());
	console.dir("");



	console.dir("-- Draw Grid --");
	DrawGrid(context, 5);

}

function DrawGrid(context, levNum) {

	for (var i=0; i<levNum; i++) {
		console.dir("FROM: (" + context.grid.left() + "," + context.grid.levelTop(i) + ") TO: (" + context.grid.right() + "," + context.grid.levelTop(i) + ")");
		console.dir("");

		context.lineWidth = 1;
		context.setLineDash([]);
		context.strokeStyle = '#666666';

		context.beginPath();
		context.moveTo(context.grid.left(), context.grid.levelTop(i)+0.5);
		context.lineTo(context.grid.right(), context.grid.levelTop(i)+0.5);
		context.stroke();		

		context.lineWidth = 1;
		context.setLineDash([10]);
		context.strokeStyle = '#999999';

		context.beginPath();
		context.moveTo(context.grid.left(), context.grid.levelRowTop(i)+0.5);
		context.lineTo(context.grid.right(), context.grid.levelRowTop(i)+0.5);
		context.stroke();		
	}
}