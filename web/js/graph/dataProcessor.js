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

	var resultObj = {};
		resultObj.nodes = {};
		resultObj.levels = {};
		resultObj.edges = [];
	
	var lastParentIdByLevel = {};
		lastParentIdByLevel[0] = null;

	var prevNode = null;


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


			// Define parentId
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

			// STORED FOR DEBUG PURPOSE ONLY
			if (nodeObject.parentId) {
				nodeObject.parentLabel = resultObj.nodes[nodeObject.parentId].label;
			} else {
				nodeObject.parentLabel = null;
			}

			// Save node
			prevNode = nodeObject;
			resultObj.nodes[nodeObject.id] = nodeObject;
			if (resultObj.levels[level] === undefined) { resultObj.levels[level] = [] }
			resultObj.levels[level].push(nodeObject);

			// Create and save edge
			if (nodeObject.parentId && nodeObject.id) {
				var edgeObject = {};
				edgeObject.type = "edge";
				edgeObject.startNodeId = nodeObject.parentId;
				edgeObject.endNodeId = nodeObject.id;
				resultObj.edges.push(edgeObject);
			}
		}
	}

	// console.dir("Result graph Object:");
	// console.dir(resultObj);

	return resultObj;
}













