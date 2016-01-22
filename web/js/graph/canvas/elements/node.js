export function RectNode(context, level, number, caption) {



	var top = context.grid.levelRowContentTop(level);
	var left = 10;
	var width = 100;
	var height = 40;


	context.beginPath();
	context.rect(left+0.5, top+0.5, width, height); 
	context.fillStyle = '#009900';
	context.lineWidth = 1;
	context.strokeStyle = 'black';

	this.draw = function() {
		context.stroke();
		context.fill();
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