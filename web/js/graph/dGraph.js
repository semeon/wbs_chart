// https://github.com/cpettitt/dagre-d3/wiki#demos
// import "libs/dagre/dagre-d3.min.js";


export function graphController(id, svgSelector) {

	self = this;

	this.code = id;

	// Create a new directed graph
	var g = new dagreD3.graphlib.Graph().setGraph({});

	var svg = d3.select(svgSelector);
    var inner = svg.select("g");

	// Set up zoom support
	var zoom = d3.behavior.zoom().on("zoom", function() {
	    inner.attr("transform", "translate(" + d3.event.translate + ")" +
	                                "scale(" + d3.event.scale + ")");
	});
	svg.call(zoom);


	// Create the renderer
	var render = new dagreD3.render();

	// Generate graph data
	var generateData = function(data) {
		// g.setNode("caption", { shape: "rect" });
		// g.setEdge("startNodeId", "endNodeId", { arrowhead: "undirected" });

		console.log("> generateData()");

		console.dir(data);

		for (var i=0; i<data.length; i++) {
			var item = data[i];
			if (item!=undefined) {
				if (item.type == "node" ) {
					g.setNode(item.id, { shape: "rect", label: item.label });
				}
				if (item.type == "edge" ) {
					g.setEdge(item.startNodeId, item.endNodeId, { arrowhead: "undirected" });
				}
			}
		}
	}


	// Center the graph
	var resetPosition = function() {
		var initialScale = 1;
		zoom
		  .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
		  .scale(initialScale)
		  .event(svg);

		svg.attr('height', g.graph().height * initialScale + 40);
	}

	// Generate data, render and center
	this.draw = function(graphData) {
		generateData(graphData);
		render(inner, g);
		resetPosition();
	}

	console.log("Graph initialized: " + this.code);
}







