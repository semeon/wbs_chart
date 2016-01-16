export var GraphPanel = React.createClass({
  getInitialState: function() {
    return {text: this.props.graphData, width:800};
  },

  componentDidMount: function() {
  	console.dir("componentDidMount called");
    this.props.graphBuilder.draw(this.state.text);
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Graph</h3>
        </div>
        <div className="panel-body">
		      <svg id="g1" width={this.state.width}><g/></svg>
        </div>
        <div className="panel-footer">Awesome?</div>
      </div>
    );
  }
});