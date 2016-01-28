// import * as graph from "js/graph/graphController.js";
// import {DataPanel} from "js/viewComponents/DataPanel.js";
// import {GraphPanel} from "js/viewComponents/GraphPanel.js";
// import {tutorial} from "js/graph/easelDraw.js";

import * as textData from "data/defaultData.js";
import {createChart} from "js/drawing/drawingController.js";


var defaultData = textData.text4;

createChart(defaultData);



/* 

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

*/