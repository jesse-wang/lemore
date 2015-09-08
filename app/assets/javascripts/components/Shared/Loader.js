var React = require('react');

var Loader = React.createClass({
  render: function(){
    return (
      <div style={{"width":"100%", "textAlign":"center", "paddingTop": "20px", "paddingBottom": "30px"}}>
        <i className="fa fa-spinner fa-spin" style={{"color":"#999999", "fontSize": "150%"}}></i>
      </div>
    );
  }
});

module.exports = Loader;