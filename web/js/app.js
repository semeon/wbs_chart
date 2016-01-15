import * as graph from "js/graph/graphController.js";
import * as textData from "data/defaultData.js";
import * as cLib from "js/viewComponents/DataPanel.js";


graph.draw(textData.text2);


// console.log(cLib.CommentBox);
// var textInput = Components.TextInput;


ReactDOM.render(
	<cLib.DataPanel defValue={textData.text2} />,
	document.getElementById('data-panel')
);
