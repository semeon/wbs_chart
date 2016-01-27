import {RectNode} from "js/graph/canvas/elements/node.js";

export function Chart() {

	// PRIVATE 
	// ----------------------------

		var chart = this;
		var chartData = {};
		var conf = {};
		var context = {};

		// analyse data to calculate chart
		// ... chartData 
		// calculate data-depending dimentions

		this.init = function(ctx, data) {
			context = ctx;
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
					conf.node.width = 50;
					conf.node.spacing = 20;
					conf.node.padding = {};
					conf.node.padding.top = 20;

				conf.levelBar = {};
					conf.levelBar.height = 20;
					conf.levelBar.paddingTop = 10;
					conf.levelBar.paddingBottom = 10;

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
			this.drawTree = function() {
				DrawChildren(chartData.tree);
			}

			this.drawNodes = function() {
				for (var id in chartData.nodes) {
					var node = chartData.nodes[id];
					var chartNode = new RectNode(chart, node, context);
					if (node.level>0) chartNode.drawParentConnector();
					chartNode.drawBox();
					chartNode.drawText();
					if (node.children.length>0) chartNode.drawChildrenBar();
				}
			}


		// chart

			this.width = function() {
				return chartData.tree.subTreeWidth;
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

			this.levelBarBottom = function(level) {
				return chart.levelTop(level) + conf.levelBar.height;
			}

			this.levelRowTop = function(level) {
				return chart.levelBarBottom(level);
			}

			this.levelRowContentTop = function(level) {
				return chart.levelTop(level) + conf.levelBar.height + conf.levelRow.paddingTop;
			}


	// Draw grid
		this.drawGrid = function(levNum) {
			console.dir("-- Draw Grid --");

			for (var i=0; i<levNum; i++) {
				console.dir("FROM: (" + chart.left() + "," + chart.levelTop(i) + ") TO: (" + chart.right() + "," + chart.levelTop(i) + ")");
				// console.dir("");


				context.beginPath();
				context.lineWidth = 1;
				context.setLineDash([]);
				context.strokeStyle = '#666666';

				context.moveTo(chart.left(), chart.levelTop(i)+0.5);
				context.lineTo(chart.right(), chart.levelTop(i)+0.5);
				context.stroke();		

				context.lineWidth = 1;
				context.setLineDash([10]);
				context.strokeStyle = '#999999';

				context.beginPath();
				context.moveTo(chart.left(), chart.levelRowTop(i)+0.5);
				context.lineTo(chart.right(), chart.levelRowTop(i)+0.5);
				context.stroke();

				context.restore();	
			}
		}

	// Debuglog
		this.debugLog = function() {
			console.dir("-- chart SETTINGS --");
			console.dir("- chart.levelHeight(): " + chart.levelHeight());
			console.dir("- chart.levelTop(0): " + chart.levelTop(0));
			console.dir("- chart.levelBottom(0): " + chart.levelBottom(0));
			console.dir("- chart.levelBarBottom(0): " + chart.levelBarBottom(0));
			console.dir("- chart.levelRowTop(0): " + chart.levelRowTop(0));
			console.dir("");	
		}


}


