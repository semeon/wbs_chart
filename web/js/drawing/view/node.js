export function RectNode(chart, node) {

	var top = chart.levelTop(node.level);
	var height = chart.nodeHeight();
	var width = chart.nodeWidth();
	var bottom = top + height;
	var spaceWidth = node.subTreeWidth;
	var offset = node.offset;
	var middle = offset + spaceWidth/2; 
	var left = offset + spaceWidth/2 - (width/2);

	var topConnectorLength = 15;
	var bottomConnectorLength = 20;

	var boxFillColour = '#2196F3';
	var boxBorderColour = '#727272';
	var labelColour = '#FFFFFF';
	var connColour  = '#727272';
	var labelFont = '12px Arial';

	this.log = function(context) {

		console.dir("- Node: " + node.label);
		console.dir("-- offset: " + offset);
		console.dir("-- spaceWidth: " + spaceWidth);
		console.dir("-- spaceWidth/2: " + spaceWidth/2);
		console.dir("-- width: " + width);
		console.dir("-- (width/2): " + (width/2));
		console.dir("-- left: " + left);
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
	}

	this.drawText = function(context) {

		// Draw TEXT
		context.default();
		context.beginPath();
		context.font = labelFont;
		context.fillStyle = labelColour;
		context.textAlign = 'center';

		context.fillText(node.label, left+width/2, top+chart.nodePaddingTop());
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