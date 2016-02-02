import {Chart} from "js/drawing/view/chart.js";
import {RectNodeView} from "js/drawing/view/node.js";

export function Drawing(m) {

	var self = this;

	var textLines = [];
	var canvas = {};
	var context = {};
	var chartView = {};
	var model = m;
	var canvasNodeId = "";
	var canvasWidth = 50;

	function BuildTreeView(node, offset) {
		node.view = new RectNodeView();
		node.view.init(node, offset, chartView,  context);

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

		node.childrenWidth = childrenWidth;
		node.view.calcSpaceWidth();
		node.subTreeWidth = node.view.getNodeSpaceWidth();
	}


	// Public
	this.init = function(nodeId) {
		canvasNodeId = nodeId;
		chartView = new Chart();
		chartView.init();
	}

	this.resetChartModel = function(rawData) {
		model.reset(rawData);
	}

	this.resetChartView = function() {
		canvas = document.getElementById(canvasNodeId);
		if (!canvas) canvas = document.createElement('canvas'); // faking canvas for calculating width before it rendered
		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.default = 	function() {
								context.lineWidth = 1;
								context.setLineDash([]);
								context.strokeStyle = '#000000';
								context.font = '14pt Arial';
							};

		// BuildNodeViews(model.getNodeList());
		BuildTreeView(model.getNodeTree(), chartView.getPaddingLeft());
		canvasWidth = model.getNodeTree().subTreeWidth + chartView.getPaddingLeft() + chartView.getPaddingRight();
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

	this.getCanvasNodeId = function() {
		return canvasNodeId;
	}

	this.getCanvasWidth = function() {
		return canvasWidth;
	}
}
