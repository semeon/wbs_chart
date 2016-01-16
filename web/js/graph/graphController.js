import * as dataParser from "js/graph/dataProcessor.js";
import * as dagre from "js/graph/dGraph.js";

export function draw(text) {
	
	console.dir("-- Drawing Started ----");
	console.dir("-- Text: ");
	console.dir(text);

	var textLines = dataParser.textToLines(text);
	var graphData = dataParser.linesToGraphObjects(textLines);


	if (graphData.length>0) {
		var graphController = new dagre.graphController("g1", "svg#g1");
		graphController.draw(graphData);
	}
}


