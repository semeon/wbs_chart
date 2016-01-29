import {DataPanel} 	from "js/page/components/DataPanel.js";
import {GraphPanel} from "js/page/components/GraphPanel.js";

export function Page(drawingController) {

	var drawing = drawingController;
	drawing.init('chartCanvas');

	this.render = function(defaultData) {

		var renderGraphPanel = function(text) {

		 	var dismounted = ReactDOM.unmountComponentAtNode(document.getElementById('graph-panel'));

		 	ReactDOM.render(
		 		<GraphPanel graphBuilder={drawing} graphData={text}/>,
		 		document.getElementById('graph-panel')
		 	);
		}

		ReactDOM.render(
			<DataPanel defValue={defaultData} draw={renderGraphPanel}/>,
			document.getElementById('data-panel')
		);
	}


}