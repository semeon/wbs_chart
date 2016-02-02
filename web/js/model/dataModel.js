import {NodeModel} from "js/model/nodeModel.js";

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
		// console.dir(lines);
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
				var id = "n"+i;
				var level = S(line).count(indentSymbol);
				var label = S(line).replaceAll(indentSymbol, "").trim().s;
				var parentId = null;
				var parentNode = null;


				// Define parentId
					if (level == 0 || !prevNode) { 	lastParentIdByLevel[0] = id;
					} else {
						if (prevNode.level < level) {
							parentId = prevNode.id;
							lastParentIdByLevel[level-1] = prevNode.id;
						} else { parentId = lastParentIdByLevel[level-1];
						}
					}
					if (processedData.nodes[parentId]) parentNode = processedData.nodes[parentId];


				// Save node
					var nodeObject = new NodeModel();
					nodeObject.init(id, label, level, parentId, parentNode);

					// Update node list
					processedData.nodes[id] = nodeObject;

					if (parentId == null ) { 
						// ROOT Node
						processedData.tree.children.push(nodeObject);  
					} else {
						// OTHER nodes
						if (parentNode) {
							parentNode.children.push(nodeObject);
						}
					}
				prevNode = nodeObject;
			}
		}

	}
}













