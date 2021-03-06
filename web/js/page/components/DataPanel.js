export var DataPanel = React.createClass({
  getInitialState: function() {
    return {text: this.props.defValue};
  },

  componentDidMount: function() {
      this.setState({text: this.props.defValue});
      this.props.draw(this.state.text);
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
    this.props.draw(e.target.value);
  },

  handleDrawButtonClick: function(e) {
    // console.dir(this.state.text);
    this.props.draw(this.state.text);
  }, 

  render: function() {
    var text = this.state.text;
    return (

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Text</h3>
              </div>
              <div className="panel-body">
                <textarea 
                  className="form-control" 
                  placeholder="Say something..." 
                  onChange={this.handleTextChange}
                  value={text}
                  rows="20"
                />
              </div>
              <div className="panel-footer">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={this.handleDrawButtonClick}
                >Draw</button>
              </div>
            </div>
    );
  }
});