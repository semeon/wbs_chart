export var GraphPanel = React.createClass({
  getInitialState: function() {
    this.props.graphBuilder.resetChartModel(this.props.graphData);
    return {text:   this.props.graphData, 
            canvasNodeId: this.props.graphBuilder.getCanvasNodeId()
            };
  },

  componentDidMount: function() {
  	console.dir("ComponentDidMount");
    this.props.graphBuilder.resetCanvas(this.state.canvasNodeId);
    this.props.graphBuilder.drawChart();
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Graph</h3>
        </div>
        <div className="panel-body">
		      <canvas id={this.state.canvasNodeId} width={this.props.graphBuilder.getCanvasWidth()} height="600"></canvas>
        </div>
        <div className="panel-footer">Awesome?</div>
      </div>
    );
  }
});