export function RectNode() {


	var self = this;

	var node = {};

	var paddingLeft;
	var paddingRight;
	var paddingBottom;

	var top;
	var height;
	var width;
	var bottom;
	var spaceWidth;
	var offset;
	var middle; 
	var left;

	var topConnectorLength;
	var bottomConnectorLength;

	var boxFillColour;
	var boxBorderColour;
	var labelColour;
	var connColour;
	var labelFont;

	function setTextContext(context) {
		context.default();
		context.font = labelFont;
		context.fillStyle = labelColour;
		context.textAlign = 'center';
	}


	// PUBLIC

	this.init = function(chart, n, ctx) {

		node = n;

		paddingLeft = 1;
		paddingRight = paddingLeft;
		paddingBottom = 8;

		top = chart.levelTop(node.level);
		height = 25;
		bottom = top + height;

		setTextContext(ctx);
		width = ctx.measureText(node.label).width + paddingLeft + paddingRight;

		spaceWidth = width;
		if (node.childrenWidth > spaceWidth) spaceWidth = node.childrenWidth;

		offset = node.offset;
		middle = offset + spaceWidth/2; 
		left = offset + spaceWidth/2 - (width/2);

		topConnectorLength = 15;
		bottomConnectorLength = 20;

		boxFillColour = '#2196F3';
		boxBorderColour = '#727272';
		labelColour = '#FFFFFF';
		connColour  = '#727272';
		labelFont = '12px Arial';
	}


	this.log = function() {

		console.dir("- Node: " + node.label);
		console.dir("-- offset: " + offset);
		console.dir("-- spaceWidth: " + spaceWidth);
		console.dir("-- spaceWidth/2: " + spaceWidth/2);
		console.dir("-- width: " + width);
		console.dir("-- (width/2): " + (width/2));
		console.dir("-- left: " + left);
	}

	this.getSubTreeWidth = function() {
		return spaceWidth;
	}

	this.drawBox = function(context) {
		// Draw RECT
		context.default();
		context.beginPath();
		context.rect(left+0.5, top+0.5, width, height); 
		context.fillStyle = boxFillColour;
		context.lineWidth = 1;
		context.strokeStyle = boxBorderColour;
		context.stroke();
		context.fill();
		console.dir("@@@");

	}


	this.drawText = function(context) {
		context.beginPath();
		setTextContext(context);
		context.fillText(node.label, left+width/2, bottom - paddingBottom);
	}

	this.drawParentConnector = function(context) {
		context.default();
		context.beginPath();
		context.moveTo(middle+0.5, top+0.5);
		context.lineTo(middle+0.5, top-topConnectorLength+0.5);
		context.strokeStyle = connColour;
		context.stroke();
	}

	this.drawChildrenBar = function(context) {
		// Draw horizontal bar
		var firstChild = node.children[0];
		var lastChild = node.children[node.children.length-1];

		var barLeft = offset + firstChild.subTreeWidth/2;
		var barRight = offset + node.subTreeWidth - lastChild.subTreeWidth/2;

		context.default();
		context.beginPath();
		context.strokeStyle = connColour;
		context.moveTo(barLeft+0.5, bottom+bottomConnectorLength+0.5);
		context.lineTo(barRight+0.5, bottom+bottomConnectorLength+0.5);
		context.stroke();

	}

	this.drawChildrenConnector = function(context) {
		// Draw connector to the horizontal bar
		context.default();
		context.beginPath();
		context.moveTo(middle+0.5, bottom+0.5);
		context.lineTo(middle+0.5, bottom+bottomConnectorLength+0.5);
		context.stroke();
	}

}