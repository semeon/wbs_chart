export function Grid(chartData, cWidth, cHeight) {

	// PRIVATE 
	// ----------------------------

		var grid = this;
		var conf = {};


		// analyse data to calculate grid
		// ... chartData 
		// calculate data-depending dimentions
		var chartDimentions = calculateDimentions(chartData);

		console.dir(chartDimentions);

			conf.chartWidth = chartDimentions.width;


		// set grid dimentions
			conf.paddingLeft = 10;
			conf.paddingRight = conf.paddingLeft;
			conf.paddingTop = 20;
			conf.paddingBottom = 20;

			conf.gridWidth = chartData.maxWidth + conf.paddingLeft + conf.paddingRight;
			conf.gridMidX = conf.gridWidth/2;

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


		function calculateDimentions(chartData) {

			var dimentions = {};
			dimentions.widestLevel = 0;
			dimentions.width = 0;

			for (var l in chartData.levels) {
				var level = chartData.levels[l];
				var width = chartData.levels[l].length;
				if (dimentions.width < width ) dimentions.width = width;
			}

			return dimentions;
		}

	// PUBLIC
	// -----------------------

		// Grid
			this.gridMidX = function() {
				return conf.gridMidX;
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
				return grid.levelHeight() * level + conf.paddingTop;
			}

			this.levelBottom = function(level) {
				return grid.levelTop(level) + grid.levelHeight();
			}

			this.levelBarBottom = function(level) {
				return grid.levelTop(level) + conf.levelBar.height;
			}

			this.levelRowTop = function(level) {
				return grid.levelBarBottom(level);
			}

			this.levelRowContentTop = function(level) {
				return grid.levelTop(level) + conf.levelBar.height + conf.levelRow.paddingTop;
			}


}


