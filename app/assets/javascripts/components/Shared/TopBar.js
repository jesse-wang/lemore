var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
// Actions
var SessionActions = require('../../actions/SessionActions');

var TopBar = React.createClass({

  mixins: [Router.Navigation],

  signOut: function(){
    SessionActions.logout();
  },

  goToMe: function() {
    this.transitionTo('expert', {username: this.props.session.userInfo.username});
  },

  render: function() {
    const brand = <Link to='home'>
                    <span style={{color:"#76cdd4", fontSize:"24px", fontWeight:"bold"}}>高高</span><span style={{color:"black", fontSize:"24px", fontWeight:"bold"}}>手</span>
                  </Link>;

    var user = this.props.session.userInfo;
    if (!user) { user = {}; }

    var signInBtn, signUpBtn, signOutBtn, becomeExpertBtn, avatarBtn;

    if (!this.props.session.isLoggedIn){ 
      signInBtn = <NavItem left onClick={this.props.openSignIn}><span style={{color:"#76cdd4"}}>登录</span></NavItem>;
      signUpBtn = <NavItem onClick={this.props.openSignUp}><span style={{color:"#76cdd4"}}>注册</span></NavItem>;
      becomeExpertBtn = <NavItem onClick={this.props.openSignUp}><span style={{background:"#76cdd4", padding:"5px 30px", color:"white"}}>成为高高手</span></NavItem>;
    } else {
      signOutBtn = <NavItem onClick={this.signOut}><span style={{color:"#76cdd4"}}>登出</span></NavItem>;
      avatarBtn = <NavItem onClick={this.goToMe}>
                    <div className="gravatar" style={{width:"20px", height:"20px", backgroundImage:"url("+user.avatar+")", backgroundSize:"cover"}} ></div>
                  </NavItem>;
    }

    return (
      <div style={{height:"50px"}}>
        <Navbar brand={brand} toggleNavKey={0} fixedTop style={{border:"none", background:"white", marginBottom:"0"}}>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            {signInBtn}
            {signUpBtn}
            {becomeExpertBtn}
            {signOutBtn}
            {avatarBtn}
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = TopBar;

