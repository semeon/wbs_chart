import {RectNode} from "js/drawing/view/node.js";

export function Chart() {

	// PRIVATE 
	// ----------------------------

		var chart = this;
		var chartData = {};
		var conf = {};

		// analyse data to calculate chart
		// ... chartData 
		// calculate data-depending dimentions

		this.init = function(data) {
			chartData = data;

			// set chart dimentions
				conf.paddingLeft = 10;
				conf.paddingRight = conf.paddingLeft;
				conf.paddingTop = 20;
				conf.paddingBottom = 20;

				// conf.chartWidth = chart.maxWidth + conf.paddingLeft + conf.paddingRight;
				// conf.chartMidX = conf.chartWidth/2;

				conf.node = {};
					conf.node.height = 25;
					conf.node.width = 70;
					conf.node.spacing = 10;
					conf.node.padding = {};
					conf.node.padding.top = 17;

				conf.levelRow = {};
					conf.levelRow.height = 60;
					conf.levelRow.paddingTop = 10;
					conf.levelRow.paddingBottom = 10;

			calculateSubTree(chartData.tree, chart.left());
		}


		function calculateSubTree(node, offset) {
			node.offset = offset;
			var subTreeWidth = 80; //nodewidth placehoder
			var childrenWidth = 0;
			var rowOffset = 0;

			if (node.children && node.children.length>0) {
				for(var i=0; i<node.children.length; i++) {
					var child = node.children[i];
					if (i > 0)	rowOffset = rowOffset + node.children[i-1].subTreeWidth + chart.nodeSpacing();
					childrenWidth = childrenWidth + calculateSubTree(child, offset + rowOffset);
					if (i > 0)	childrenWidth = childrenWidth + chart.nodeSpacing();
				}
			}

			if (childrenWidth > subTreeWidth) subTreeWidth = childrenWidth;
			node.subTreeWidth = subTreeWidth;

			return subTreeWidth;
		}



	// PUBLIC
	// -----------------------

		// Drawing
			this.drawNodes = function(context) {
				for (var id in chartData.nodes) {
					var node = chartData.nodes[id];
					var chartNode = new RectNode(chart, node, context);
					chartNode.drawBox();
					chartNode.drawText();
					if (node.level>0) chartNode.drawParentConnector(); 
					if (node.children.length>1) chartNode.drawChildrenBar();
					if (node.children.length>0) chartNode.drawChildrenConnector();
				}
			}


		// chart

			this.getWidth = function() {
				return chartData.tree.subTreeWidth + chart.nodeSpacing() + conf.paddingRight;
			}

			this.chartMidX = function() {
				return conf.chartMidX;
			}

			this.left = function() {
				return conf.paddingLeft;
			}
			this.right = function() {
				return chart.width() - conf.paddingRight;
			}
			
			this.top = function() {
				return chart.width + conf.paddingTop;
			}

		// Node 
			this.nodeHeight = function() {
				return conf.node.height;
			}

			this.nodeWidth = function() {
				return conf.node.width;
			}

			this.nodeSpacing = function() {
				return conf.node.spacing;
			}

			this.nodePaddingTop = function() {
				return conf.node.padding.top;
			}

		// Level
			this.levelHeight = function() {
				return conf.levelRow.height;
			}

			this.levelTop = function(level) {
				return chart.levelHeight() * level + conf.paddingTop;
			}

			this.levelBottom = function(level) {
				return chart.levelTop(level) + chart.levelHeight();
			}


	// Debuglog
		this.debugLog = function() {
			console.dir("-- chart SETTINGS --");
			console.dir("- chart.levelHeight(): " + chart.levelHeight());
			console.dir("- chart.levelTop(0): " + chart.levelTop(0));
			console.dir("- chart.levelBottom(0): " + chart.levelBottom(0));
			console.dir("");	
		}


}


