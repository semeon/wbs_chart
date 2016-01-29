import {Chart} from "js/drawing/view/chart.js";
import {RectNode} from "js/drawing/view/node.js";

export function Drawing(m) {

	var self = this;

	var textLines = [];
	var canvas = {};
	var context = {};
	var chartView = {};
	var model = m;
	var canvasNodeId = "";

	chartView = new Chart();



	function BuildTreeView(node, offset) {
		node.offset = offset;
		var subTreeWidth = 80; //nodewidth placehoder
		var childrenWidth = 0;
		var rowOffset = 0;

		if (node.children && node.children.length>0) {
			for(var i=0; i<node.children.length; i++) {
				var child = node.children[i];
				if (i > 0)	rowOffset = rowOffset + node.children[i-1].subTreeWidth + chartView.nodeSpacing();
				BuildTreeView(child, offset + rowOffset);
				childrenWidth = childrenWidth + child.subTreeWidth;
				if (i > 0)	childrenWidth = childrenWidth + chartView.nodeSpacing();
			}
		}

		if (childrenWidth > subTreeWidth) subTreeWidth = childrenWidth;

		node.subTreeWidth = subTreeWidth;

		// Create node.view objects
		node.view = new RectNode(chartView, node);

		return subTreeWidth;
	}



	// Public
	this.init = function(nodeId) {
		canvasNodeId = nodeId;
		chartView.init();
	}

	this.getCanvasNodeId = function() {
		return canvasNodeId;
	}

	this.resetCanvas = function() {
		canvas = document.getElementById(canvasNodeId);
		context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.default = 	function() {
								context.lineWidth = 1;
								context.setLineDash([]);
								context.strokeStyle = '#000000';
								context.font = '14pt Arial';
							}

	}

	this.resetChartModel = function(rawData) {
		model.reset(rawData);
		BuildTreeView(model.getNodeTree(), chartView.getPaddingLeft());
	}

	this.drawChart = function() {
		var nodes = model.getNodeList();

		for (var id in nodes) {
			var node = nodes[id];
			node.view.drawBox(context);
			node.view.drawText(context);
			if (node.level>0) node.view.drawParentConnector(context); 
			if (node.children.length>1) node.view.drawChildrenBar(context);
			if (node.children.length>0) node.view.drawChildrenConnector(context);
		}
	}

	this.getCanvasWidth = function() {
		return model.getNodeTree().subTreeWidth + chartView.getPaddingLeft() + chartView.getPaddingRight();
	}
}
