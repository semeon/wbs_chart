export function Grid(chartData, cWidth, cHeight) {

	var grid = this;
	var conf = {};


	// analyse data to calculate grid
	// ... chartData 
	conf.chartWidth = 500;



	// set grid measurements
	
	conf.paddingLeft = 10;
	conf.paddingRight = conf.paddingLeft;
	conf.paddingTop = 20;
	conf.paddingBottom = 20;

	conf.gridWidth = chartData.maxWidth + conf.paddingLeft + conf.paddingRight;
	conf.gridMidX = conf.gridWidth/2;


	conf.levelBar = {};
		conf.levelBar.height = 20;
		conf.levelBar.paddingTop = 10;
		conf.levelBar.paddingBottom = 10;

	conf.levelRow = {};
		conf.levelRow.height = 80;
		conf.levelRow.paddingTop = 10;
		conf.levelRow.paddingBottom = 10;

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