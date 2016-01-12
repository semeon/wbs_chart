// Create a new directed graph
var g = new dagreD3.graphlib.Graph().setGraph({});

g.setNode("rect", { shape: "rect" });
g.setNode("circle", { shape: "circle" });
g.setNode("ellipse", { shape: "ellipse" });
g.setNode("diamond", { shape: "diamond" });

var svg = d3.select("svg"),
    inner = svg.select("g");

// Set up zoom support
var zoom = d3.behavior.zoom().on("zoom", function() {
      inner.attr("transform", "translate(" + d3.event.translate + ")" +
                                  "scale(" + d3.event.scale + ")");
    });
svg.call(zoom);

// Create the renderer
var render = new dagreD3.render();

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Center the graph
var initialScale = 2;
zoom
  .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
  .scale(initialScale)
  .event(svg);
svg.attr('height', g.graph().height * initialScale + 40);