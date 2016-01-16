import * as graph from "js/graph/graphController.js";
import * as textData from "data/defaultData.js";
import {DataPanel} from "js/viewComponents/DataPanel.js";
import {GraphPanel} from "js/viewComponents/GraphPanel.js";

var defaultData = textData.text2;

var renderGraphPanel = function(text) {
	var dismounted = ReactDOM.unmountComponentAtNode(document.getElementById('graph-panel'));
	ReactDOM.render(
		<GraphPanel graphBuilder={graph} graphData={text}/>,
		document.getElementById('graph-panel')
	);
}

ReactDOM.render(
	<DataPanel defValue={defaultData} draw={renderGraphPanel}/>,
	document.getElementById('data-panel')
);

