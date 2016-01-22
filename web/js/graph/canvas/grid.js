export function Grid(cWidth, cHeight) {

	var grid = this;

	var conf = {};

	conf.canvasMidX = cWidth/2;
	conf.paddingLeft = 10;
	conf.paddingRight = conf.paddingLeft;
	conf.paddingTop = 20;

	conf.levelBar = {};
	conf.levelBar.height = 20;
	conf.levelBar.paddingTop = 10;
	conf.levelBar.paddingBottom = 10;

	conf.levelRow = {};
	conf.levelRow.height = 80;
	conf.levelRow.paddingTop = 10;
	conf.levelRow.paddingBottom = 10;

	this.canvasMidX = function() {
		return conf.canvasMidX;
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