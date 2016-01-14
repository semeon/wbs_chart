import * as dataParser from "js/graph/dataProcessor.js";
import * as dagre from "js/graph/dGraph.js";


export var controller = new GraphController();

function GraphController() {

	this.draw = function(text) {
		var textLines = dataParser.textToLines(text);
		var graphData = dataParser.linesToGraphObjects(textLines);

		if (graphData.length>0) {
			var graphController = new dagre.graphController("g1", "svg#g1");
			graphController.draw(graphData);
		}
	}
}

export function draw(text) {
	var textLines = dataParser.textToLines(text);
	var graphData = dataParser.linesToGraphObjects(textLines);

	if (graphData.length>0) {
		var graphController = new dagre.graphController("g1", "svg#g1");
		graphController.draw(graphData);
	}
}

