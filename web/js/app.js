import * as graph from "js/graph/graphController.js";
import * as textData from "js/graph/defaultData.js";

var rawText = textData.text1;
graph.controller.draw(rawText);


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