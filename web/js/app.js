

import * as Dagre from "js/dGraph.js";
import * as DataParser from "js/dataProcessor.js";



var graphData = [];

var dataItem1 = {};
dataItem1.type = "node";
dataItem1.caption = "Root Node";

graphData.push(dataItem1);



var graphController = new Dagre.graphController("g1", "svg#g1");
graphController.draw(graphData);



/**
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});


ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);

*/