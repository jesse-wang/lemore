var React = require('react');
// var PnStore = require('../../stores/PnStore');
// var AppActions = require('../../actions/AppActions');

var FollowButton = React.createClass({
  displayName: 'FollowButton',

  propTypes: {
    session: React.PropTypes.object.isRequired,
    openSignIn: React.PropTypes.func.isRequired,
    username: React.PropTypes.string.isRequired,
    following: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return ({
      following: this.props.following
    });
  },
  
  // handleFollowUnfollow: function() {
  //   if(this.props.session.isLoggedIn){
  //     var data = {username: this.props.username};
  //     if (this.state.following) {
  //       AppActions.unfollowUser(data);
  //     } else {
  //       AppActions.followUser(data);
  //     }
  //     this.setState({
  //       following: !this.state.following
  //     });
  //   } else {
  //     this.props.openSignIn();
  //   }
  // },

  render: function() {
    var button;

    // if (this.props.session.isLoggedIn && this.state.following) {
      // button = <button className="btn" onClick={this.handleFollowUnfollow}>Unfollow</button>;
    // } else if (this.props.session.isLoggedIn && !this.state.following) {
      // button = <button className="btn btn-info" onClick={this.handleFollowUnfollow}>Follow</button>;
    // } else {
      // button = <button className="btn btn-info" onClick={this.props.openSignIn}>Follow</button>;
    // }

    // if (this.props.session.isLoggedIn && this.props.session.userInfo.username == this.props.username) {
      // button = <div></div>
    // }

    button = <button className="btn btn-info">Follow</button>

    return (
      <div>
        {button}
      </div>
    );
  }
});

module.exports = FollowButton;