export var GraphPanel = React.createClass({
  getInitialState: function() {

    this.props.graphBuilder.init('chartCanvas');
    this.props.graphBuilder.resetChartModel(this.props.graphData);
    // console.dir(this.props.graphBuilder.getChartWidth());

    return {text:   this.props.graphData, 
            width:  this.props.graphBuilder.getCanvasWidth(),
            canvasNodeId: this.props.graphBuilder.getCanvasNodeId()
            };
  },

  componentDidMount: function() {
  	console.dir("componentDidMount called");
    this.props.graphBuilder.resetChartModel(this.props.graphData);
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
		      <canvas id={this.state.canvasNodeId} width={this.state.width} height="600"></canvas>
        </div>
        <div className="panel-footer">Awesome?</div>
      </div>
    );
  }
});