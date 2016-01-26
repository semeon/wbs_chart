export function Chart(chartData, cWidth, cHeight) {

	// PRIVATE 
	// ----------------------------

		var chart = this;
		var conf = {};
		var cWidth = 0;
		var cHeight = 0;

		// analyse data to calculate chart
		// ... chartData 
		// calculate data-depending dimentions

		this.init = function(chartData, width, height) {
			cWidth = width;
			cHeight = height;

			// set chart dimentions
				conf.paddingLeft = 10;
				conf.paddingRight = conf.paddingLeft;
				conf.paddingTop = 20;
				conf.paddingBottom = 20;

				conf.chartWidth = chartData.maxWidth + conf.paddingLeft + conf.paddingRight;
				conf.chartMidX = conf.chartWidth/2;

				conf.node = {};
					conf.node.height = 30;
					conf.node.width = 80;
					conf.node.spacing = 40;
					conf.node.padding = {};
					conf.node.padding.top = 20;

				conf.levelBar = {};
					conf.levelBar.height = 20;
					conf.levelBar.paddingTop = 10;
					conf.levelBar.paddingBottom = 10;

				conf.levelRow = {};
					conf.levelRow.height = 80;
					conf.levelRow.paddingTop = 10;
					conf.levelRow.paddingBottom = 10;

			calculateSubTreeWidth(chartData.tree);
		}


		function calculateSubTreeWidth(node) {

			var subTreeWidth = 80; //nodewidth placehoder
			var childrenWidth = 0;


			if (node.children && node.children.length>0) {

				for(var i=0; i<node.children.length; i++) {
					var child = node.children[i];
					childrenWidth = childrenWidth + calculateSubTreeWidth(child);
				}

				childrenWidth = childrenWidth + (node.children.length-1)*chart.nodeSpacing();
			}

			if (childrenWidth > subTreeWidth) subTreeWidth = childrenWidth;
			if (!node.subTreeWidth) node.subTreeWidth = subTreeWidth;

			console.log("Node: " + node.label + ", subTreeWidth: " + subTreeWidth);
			if (node.children && node.children.length>0) {
				for(var i=0; i<node.children.length; i++) {
					var child = node.children[i];
					console.log("- Child[" + i + "] aka " + child.label + ", subTreeWidth: " + child.subTreeWidth);
				}
			}
			return subTreeWidth;
		}

	// PUBLIC
	// -----------------------

		// chart
			this.chartMidX = function() {
				return conf.chartMidX;
			}

			this.left = function() {
				return conf.paddingLeft;
			}
			this.right = function() {
				return cWidth - conf.paddingRight;
			}
			
			this.top = function() {
				return conf.paddingTop;
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
				return conf.levelBar.height + conf.levelRow.height;
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
		this.drawGrid = function(context, levNum) {
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


