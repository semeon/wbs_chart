export function RectNode(chart, node, context) {

	var top = chart.levelRowContentTop(node.level);
	var height = chart.nodeHeight();
	var spaceWidth = node.subTreeWidth;
	var width = chart.nodeWidth();
	var offset = node.offset;
	var middle = offset + spaceWidth/2; 
	var left = offset + spaceWidth/2 - (width/2);

	this.long = function(context) {

		console.dir("- Node: " + node.label);
		console.dir("-- offset: " + offset);
		console.dir("-- spaceWidth: " + spaceWidth);
		console.dir("-- spaceWidth/2: " + spaceWidth/2);
		console.dir("-- width: " + width);
		console.dir("-- (width/2): " + (width/2));
		console.dir("-- left: " + left);
	}

	this.drawBox = function() {

		// Draw RECT
		context.default();
		context.beginPath();
		context.rect(left+0.5, top+0.5, width, height); 
		context.fillStyle = '#009900';
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.stroke();
		context.fill();
	}

	this.drawText = function() {

		// Draw TEXT
		context.default();
		context.beginPath();
		context.font = '14px Arial';
		context.fillStyle = '#333333';
		context.textAlign = 'center';

		context.fillText(node.label, left+width/2, top+chart.nodePaddingTop());
	}

	this.drawParentConnector = function() {
		context.default();
		context.beginPath();
		context.moveTo(middle+0.5, top+0.5);
		context.lineTo(middle+0.5, top-18.5);
		context.strokeStyle = '#0000aa';
		context.stroke();
	}

	this.drawChildrenBar = function() {
		// Draw DEBUG lines
		context.default();
		context.beginPath();
		context.moveTo(offset+0.5, top+40.5);
		context.lineTo(offset+spaceWidth+0.5, top+40.5);
		context.strokeStyle = '#0000aa';
		context.stroke();
	}


}