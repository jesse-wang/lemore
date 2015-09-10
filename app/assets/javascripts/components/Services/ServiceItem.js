var React = require('react');
var Link = require('react-router').Link;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ServiceItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render: function() {
    var item = this.props.item;

    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
        <div  className="service-item">
          <Link to="expert" params={{username: "test"}}>
            <div style={{border:"1px solid lightgray", padding:"20px"}}> 
              <h5 style={{height:"30px"}}><b>{item.title}</b></h5>
              <img src={item.image} alt={item.title} width="100%" />
            </div>
          </Link>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = ServiceItem;

