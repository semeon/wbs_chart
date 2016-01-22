export function tutorial() {

	console.dir("WWWW");

	var stage = new createjs.Stage("demoCanvas");

	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;

	var rect = new createjs.Rectangle(0, 0, 100, 100);
	stage.addChild(rect);
	stage.update();

	
}

function Node() {

	// var coords = {};
	// coords.top

	this.top = 0;
	this.bottom = 0;
	this.left = 0;
	this.right = 0;


}