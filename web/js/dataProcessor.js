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
			var dataItem = {};
			var level = S(line).count(indentSymbol);
			var label = S(line).replaceAll(indentSymbol, "").s;

			dataItem.type = "node";
			dataItem.level = level;
			dataItem.id = "n"+i;
			dataItem.label = label;

			if (level == 0 || !prevNode) {
				dataItem.parentId = null;
				lastParentByLevel[level] = dataItem;

			} else {
				if (prevNode.level < level) {
					dataItem.parentId = prevNode.id;
					lastParentByLevel[level] = dataItem;
				} else {
					dataItem.parentId = lastParentByLevel[level-1];
				}
			}

			console.dir(dataItem);

			prevNode = dataItem;
			resultArray.push(dataItem);
		}
	}

	// console.dir("Result graph Objects:");
	console.dir(resultArray);

	return resultArray;
}













