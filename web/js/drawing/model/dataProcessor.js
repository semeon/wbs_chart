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
		resultObj.tree = {}; // abstract root, not a node
			resultObj.tree.label = "ROOT"; // not visible to user
			resultObj.tree.children = [];

	
	var lastParentIdByLevel = {};
		lastParentIdByLevel[0] = null;

	var prevNode = null;


	for (var i=0; i<lines.length; i++) {
		var line = lines[i];
		if (S(line).length > 0) {
			
			// Create node
			var level = S(line).count(indentSymbol);
			var label = S(line).replaceAll(indentSymbol, "").trim().s;
			var nodeObject = {};
				nodeObject.id = "n"+i;
				nodeObject.type = "node";
				nodeObject.level = level;
				nodeObject.label = label;
				nodeObject.parentId = null;
				nodeObject.children = [];


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
				// Update node list
				resultObj.nodes[nodeObject.id] = nodeObject;
				
				// Update level list -- Do i need it at all?
				if (resultObj.levels[level] === undefined) { resultObj.levels[level] = [] }
				resultObj.levels[level].push(nodeObject);

				// Update tree
					if (nodeObject.parentId == null ) {
						// Saving a root node
						resultObj.tree.children.push(nodeObject);
					} else {
						// Saving a child node
						if (resultObj.nodes[nodeObject.parentId]) {
							resultObj.nodes[nodeObject.parentId].children.push(nodeObject);
						} else { console.log("Building tree error!"); }
					}

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

	return resultObj;
}












