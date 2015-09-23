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
        <div className="service-item">
          <Link to="expert" params={{username: item.username}} className="block-item">

            <div className="text-center" style={{position:"absolute", bottom:"0", width:"320px", padding:"30px"}}>
              <h3 style={{color:"white", marginBottom:"0"}}>{item.nickname}</h3>
              <p style={{color:"white"}}>{item.position}</p>
            </div>

            <div className="hovercontent">
              <div style={{position:"absolute", bottom:"0", width:"100%"}}>
                <h3 style={{color:"#76cdd4", marginBottom:"0"}}>{item.nickname}</h3>
                <p style={{color:"#76cdd4"}}>{item.position}</p>
                <p style={{color:"#76cdd4", padding:"0 30px", lineHeight:"1.3", marginTop:"30px"}}>{item.headline}</p>
              </div>
            </div>

            <img src={item.avatar} alt={item.nickname} width="100%" height="100%" />
            
            {/*<div style={{border:"1px solid lightgray", padding:"20px"}}> 
              <h5><b>{item.headline}</b></h5>
              <p><b>高手： {item.nickname}</b></p>
            </div>*/}
          </Link>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = ServiceItem;

