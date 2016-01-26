export function RectNode(context, level, number, caption) {

	var top = context.chart.levelRowContentTop(level);
	var width = context.chart.nodeWidth();
	var height = context.chart.nodeHeight();

	var left = context.chart.left() + (context.chart.nodeSpacing() + width)*number;

	this.draw = function() {

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

			context.fillText(caption, left+width/2, top+context.chart.nodePaddingTop());

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