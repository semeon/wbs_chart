export function RectNode(chart, node) {

	var top = chart.levelRowContentTop(node.level);
	var height = chart.nodeHeight();
	var spaceWidth = node.subTreeWidth;
	var width = chart.nodeWidth();
	var left = 0;

	this.draw = function(context, offset) {
		left = offset + spaceWidth/2 - (width/2);

		console.dir("- Node: " + node.label);
		console.dir("-- offset: " + offset);
		console.dir("-- spaceWidth: " + spaceWidth);
		console.dir("-- spaceWidth/2: " + spaceWidth/2);
		console.dir("-- width: " + width);
		console.dir("-- (width/2): " + (width/2));
		console.dir("-- left: " + left);

		// Draw DEBUG lines
			context.default();
			context.beginPath();
			context.moveTo(offset+0.5, top+10.5);
			context.lineTo(offset+spaceWidth+0.5, top+10.5);
			context.strokeStyle = '#0000aa';
			context.stroke();

		// Draw RECT
			context.default();
			context.beginPath();
			context.rect(left+0.5, top+0.5, width, height); 
			context.fillStyle = '#009900';
			context.lineWidth = 1;
			context.strokeStyle = 'black';
			context.stroke();
			context.fill();


		// Draw TEXT
			context.default();
			context.beginPath();
			context.font = '14px Arial';
			context.fillStyle = '#333333';
			context.textAlign = 'center';

			context.fillText(node.label, left+width/2, top+chart.nodePaddingTop());

	}

	this.getTop = function () {
		return top;
	}

	this.getBottom = function () {
		var bottom = top + height;
		return bottom;
	}

	this.getLeft = function () {
		return left;
	}

	this.getRight = function () {
		var right = left + width;
		return right;
	}

	this.getMidX = function () {
		var midX = left + width/2;
		return midX;
	}

	this.getMidY = function () {
		var midY = top + height/2;
		return midY;
	}

}