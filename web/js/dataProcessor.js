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

	console.dir("Adding data items:");

	var resultArray = [];
	
	var lastParentByLevel = {};
	lastParentByLevel[0] = null;
	var prevNode = null;

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

			console.dir(nodeObject);


			// Create node


			prevNode = nodeObject;
			resultArray.push(nodeObject);
		}
	}

	// console.dir("Result graph Objects:");
	console.dir(resultArray);

	return resultArray;
}













