var indentSymbol = "|";

export function textToLines(rawText) {
	console.log("reading text..");

	var processedText = rawText;
	processedText = S(processedText).replaceAll('\t', indentSymbol).s;
	processedText = S(processedText).replaceAll('>', indentSymbol).s;
	processedText = S(processedText).trim().s;

	var lines = [];
	lines = S(processedText).lines();

	console.dir(lines);

	return lines;
}

export function linesToGraphObjects(lines) {

	console.dir("Adding data items..");

	var resultArray = [];
	
	var lastParentIdByLevel = {};
	lastParentIdByLevel[0] = null;
	var prevNode = null;

	var prevNodeLevel = null;


	for (var i=0; i<lines.length; i++) {
		var line = lines[i];
		if (S(line).length > 0) {
			
			// Create node
			var nodeObject = {};
			var level = S(line).count(indentSymbol);
			var label = S(line).replaceAll(indentSymbol, "").trim().s;

			nodeObject.type = "node";
			nodeObject.level = level;
			nodeObject.id = "n"+i;
			nodeObject.label = label;
			nodeObject.parentId = null;

			if (level == 0 || !prevNode) {
				nodeObject.parentId = null;
				lastParentIdByLevel[level] = nodeObject.id;
			} else {
				if (prevNode.level < level) {
					nodeObject.parentId = prevNode.id;
					lastParentIdByLevel[level-1] = prevNode.id;
					// lastParentIdByLevel[level] = nodeObject.id; - seems to be uneccessary
				} else {
					nodeObject.parentId = lastParentIdByLevel[level-1];
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
				resultArray.push(edgeObject);
			}
		}
	}

	// console.dir("Result graph Objects:");
	// console.dir(resultArray);

	return resultArray;
}













