import * as textData from "js/data.js";

var indentSymbol = "|";
var rawText = textData.text1;

export function textToLines() {
	console.log("reading text..");

	var processedText = rawText;
	processedText = S(processedText).replaceAll('\t', indentSymbol).s;
	processedText = S(processedText).trim().s;

	var lines = [];
	lines = S(processedText).lines();

	console.dir(lines);

	return lines;
}

export function linesToGraphObjects(lines) {

	console.dir("Adding data items..");

	var resultArray = [];
	
	var lastParentByLevel = {};
	lastParentByLevel[0] = null;
	var prevNode = null;

	var prevNodeLevel = null;


	for (var i=0; i<lines.length; i++) {
		var line = lines[i];
		if (S(line).length > 0) {
			
			// Create node
			var nodeObject = {};
			var level = S(line).count(indentSymbol);
			var label = S(line).replaceAll(indentSymbol, "").s;

			nodeObject.type = "node";
			nodeObject.level = level;
			nodeObject.id = "n"+i;
			nodeObject.label = label;
			nodeObject.parentId = null;

			if (level == 0 || !prevNode) {
				nodeObject.parentId = null;
				lastParentByLevel[level] = nodeObject;
			} else {
				if (prevNode.level < level) {
					nodeObject.parentId = prevNode.id;
					lastParentByLevel[level] = nodeObject;
				} else {
					nodeObject.parentId = lastParentByLevel[level-1].id;
				}
			}


			// Save node
			prevNode = nodeObject;
			resultArray.push(nodeObject);

			// Create and save edge
			if (nodeObject.parentId && nodeObject.id) {
				var edgeObject = {};
				edgeObject.type = "edge";
				edgeObject.startNodeId = nodeObject.parentId;
				edgeObject.endNodeId = nodeObject.id;

				// console.dir(edgeObject);

				resultArray.push(edgeObject);
			}


		}
	}

	// console.dir("Result graph Objects:");
	// console.dir(resultArray);

	return resultArray;
}













