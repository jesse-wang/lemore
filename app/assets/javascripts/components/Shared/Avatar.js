var React = require('react');
var Link = require('react-router').Link;
var Popover = require('react-bootstrap').Popover;
var TimerMixin = require('react-timer-mixin');
var Overlay = require('react-bootstrap').Overlay;
// Constants
var Initializers = require('../../constants/Initializers');
// Components
var FollowButton = require('./FollowButton');

var Avatar = React.createClass({
  displayName: 'Avatar',

  propTypes: {
    session:    React.PropTypes.object.isRequired,
    openSignIn: React.PropTypes.func.isRequired,
    user:       React.PropTypes.object.isRequired,
    size:       React.PropTypes.string.isRequired
  },

  mixins: [TimerMixin],

  getInitialState: function() {
    return ({
      show: false
    });
  },
  
  mouseOverhandler: function() {
    // this.refs.pop.show();
    this.setState({
      show: true
    });
  },

  mouseOuthandler: function() {
    this.timer = this.setTimeout(
      ()=> {this.setState({
        show: false
      });},
      5
    );
  },

  render: function() {
    var user = this.props.user;

    if (!user) {
      user = Initializers.user;
    }

    var badge;
    if (user.badges !== undefined && user.badges.length > 0) {
      var sizeClass = this.props.size < 40 ? "sm" : this.props.size < 100 ? "md" : "lg";
      var firstBadge = user.badges[0];
      badge = <Badge badge={firstBadge} sizeClass={sizeClass}/>
    }

    return (
      <div className="user-avatar">
        <Link to="expert" params={{username: user.username}} ref='target' onMouseOver={this.mouseOverhandler} onMouseOut={this.mouseOuthandler}>
          {badge}
          <img className="gravatar" width={this.props.size} height={this.props.size}  src={user.avatar} />
        </Link>
        <Overlay
          show={this.state.show}
          placement="bottom"
          target={ props => React.findDOMNode(this.refs.target)}
        >
          <Popover onMouseOver={this.mouseOverhandler} onMouseOut={this.mouseOuthandler}>
            <div style={{"textAlign":"center"}}>
              <Link to="expert" params={{username: user.username}}>
                <div className="user-avatar">
                  <img className="gravatar" height="50" src={user.avatar} />
                </div>
                <h4 className="user-name">
                  {user.username}
                </h4>
              </Link>
              <h5 className="user-title">
                {user.headline}
                <br />
              </h5>
              <div>
                <FollowButton session={this.props.session} openSignIn={this.props.openSignIn} username={user.username} following={user.following}/>
              </div>
            </div>
          </Popover>
        </Overlay>
      </div>
    );
  }
});

var Badge = React.createClass({
  propTypes: {
    badge:      React.PropTypes.string.isRequired,
    sizeClass:  React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <span className={"user-image--badge v-" + this.props.badge + " v-" + this.props.sizeClass}>{this.props.badge[0].toUpperCase()}</span>
    );
  }
});

module.exports = {
  Avatar: Avatar,
  Badge:  Badge
};

