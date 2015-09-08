var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ServiceItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render: function() {
    var item = this.props.item;

    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
        <div className="service-item">
          <div style={{border:"1px solid lightgray", padding:"20px"}}> 
            <h5 style={{height:"30px"}}><b>{item.title}</b></h5>
            <img src={item.image} alt={item.title} width="100%" />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = ServiceItem;

