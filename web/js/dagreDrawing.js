// https://github.com/cpettitt/dagre-d3/wiki#demos

// Create a new directed graph
var g = new dagreD3.graphlib.Graph().setGraph({});

g.setNode("root", { shape: "rect" });
  g.setNode("a1", { shape: "rect"});
    g.setNode("a11", { shape: "rect" });
    g.setNode("a12", { shape: "rect" });
    g.setNode("a13", { shape: "rect" });
    g.setNode("a14", { shape: "rect" });
  g.setNode("a2", { shape: "rect" });
    g.setNode("a21", { shape: "rect" });
    g.setNode("a22", { shape: "rect" });
    g.setNode("a23", { shape: "rect" });
    g.setNode("a24", { shape: "rect" });
  g.setNode("a3", { shape: "rect" });
    g.setNode("a31", { shape: "rect" });
    g.setNode("a32", { shape: "rect" });
    g.setNode("a33", { shape: "rect" });
    g.setNode("a34", { shape: "rect" });


g.setEdge("root", "a1", { arrowhead: "undirected" });
  g.setEdge("a1", "a11", { arrowhead: "undirected" });
  g.setEdge("a1", "a12", { arrowhead: "undirected" });
  g.setEdge("a1", "a13", { arrowhead: "undirected" });
  g.setEdge("a1", "a14", { arrowhead: "undirected" });

g.setEdge("root", "a2", { arrowhead: "undirected" });
  g.setEdge("a2", "a21", { arrowhead: "undirected" });
  g.setEdge("a2", "a22", { arrowhead: "undirected" });
  g.setEdge("a2", "a23", { arrowhead: "undirected" });
  g.setEdge("a2", "a24", { arrowhead: "undirected" });

g.setEdge("root", "a3", { arrowhead: "undirected" });
  g.setEdge("a3", "a31", { arrowhead: "undirected" });
  g.setEdge("a3", "a32", { arrowhead: "undirected" });
  g.setEdge("a3", "a33", { arrowhead: "undirected" });
  g.setEdge("a3", "a34", { arrowhead: "undirected" });



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
var initialScale = 0.5;
zoom
  .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
  .scale(initialScale)
  .event(svg);
svg.attr('height', g.graph().height * initialScale + 40);


