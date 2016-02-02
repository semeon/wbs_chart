export var model = new DataModel();


function DataModel() {

	var indentSymbol = "|";
	var rawData = "";
	var processedData = {};

	// PUBLIC
	this.reset = function(data) {
		rawData = data;
		processedData = {};
		processedData.nodes = {};
		processedData.tree = {}; // abstract root, not a node
			processedData.tree.label = "ROOT"; // not visible to user
			processedData.tree.children = [];
			processedData.tree.system = true;

		processTextData();
	}

	this.getData = function() {
		return processedData;
	}

	this.getNodeList = function() {
		return processedData.nodes;
	}

	this.getNodeTree = function() {
		return processedData.tree;
	}


	// PRIVATE
	function textToLines(rawText) {
		var processedText = rawText;
		processedText = S(processedText).replaceAll('\t', indentSymbol).s;
		processedText = S(processedText).replaceAll('>', indentSymbol).s;
		processedText = S(processedText).trim().s;

		var lines = [];
		lines = S(processedText).lines();

		console.dir(lines);

		return lines;
	}

	function processTextData () {

		// Pre-preocess raw data
		var lines = textToLines(rawData);
		
		// Set counters and iteration conext
		var prevNode = null;
		var lastParentIdByLevel = {};
			lastParentIdByLevel[0] = null;

		for (var i=0; i<lines.length; i++) {
			var line = lines[i];
			if (S(line).length > 0) {
				
				// Create node
				var level = S(line).count(indentSymbol);
				var label = S(line).replaceAll(indentSymbol, "").trim().s;
				var nodeObject = {};
					nodeObject.id = "n"+i;
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
						} else {
							nodeObject.parentId = lastParentIdByLevel[level-1];
						}
					}

				// Save node
					prevNode = nodeObject;
					// Update node list
					processedData.nodes[nodeObject.id] = nodeObject;
					
					// Update level list -- Do i need it at all?
					// if (processedData.levels[level] === undefined) { processedData.levels[level] = [] }
					// processedData.levels[level].push(nodeObject);

					// Update tree
						if (nodeObject.parentId == null ) {
							// Saving a root node
							processedData.tree.children.push(nodeObject);
						} else {
							// Saving a child node
							if (processedData.nodes[nodeObject.parentId]) {
								nodeObject.parentObj = processedData.nodes[nodeObject.parentId];
								processedData.nodes[nodeObject.parentId].children.push(nodeObject);
							} else { console.log("Building tree error!"); }
						}
			}
		}
	}
}













