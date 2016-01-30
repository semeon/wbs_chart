export var GraphPanel = React.createClass({

  getInitialState: function() {
    return {text:   this.props.graphData,
            width:  this.props.graphBuilder.getCanvasWidth()
            };
  },

  componentDidMount: function() {
    console.dir("ComponentDidMount: " + this.props.graphBuilder.getCanvasWidth());
    this.props.graphBuilder.resetChartModel(this.props.graphData);
    this.props.graphBuilder.resetCanvas();
    this.props.graphBuilder.resetChartView();
    this.props.graphBuilder.drawChart();
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Graph</h3>
        </div>
        <div className="panel-body">
		      <canvas id={this.props.graphBuilder.getCanvasNodeId()} width={this.state.width} height="600"></canvas>
        </div>
        <div className="panel-footer">Awesome?</div>
      </div>
    );
  }
});