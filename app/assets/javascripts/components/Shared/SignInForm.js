var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Formsy = require('formsy-react');
var Router = require('react-router');
var Link = Router.Link;

// Actions
var SessionActions = require('../../actions/SessionActions');
// Components
var FormInput = require('./FormInput');

var SignInForm = React.createClass({

  getInitialState: function() {
    return {
      showModal: false,
      canSubmit: false
    };
  },

  componentWillReceiveProps: function(nextProp){
    if(nextProp.session.isLoggedIn){
      this.closeModal();
    }
  },

  closeModal: function(){
    this.setState({
      showModal: false
    });
  },

  openModal: function(){
    this.setState({
      showModal: true
    });
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  submit: function(model){
    var data = {login: model.login, password: model.password};
    SessionActions.login(data);
  },

  openSignUp: function(){
    this.closeModal();
    this.props.openSignUp();
  },

  render: function() {

    var session = this.props.session;
    if (session.isLoggedIn == false && session.error != null){
      var errorMsg = 'Invalid login';
    }

    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Body style={{padding:"0"}}>
          <div style={{padding:"25px"}}>
            <div  className="close" 
                  onClick={this.closeModal} 
                  style={{position:"absolute", 
                          top:"5px", 
                          right:"10px", 
                          padding:"10px", 
                          cursor:"pointer"}}>
              <span>&times;</span>
            </div>
            <h2>Sign In</h2>
            {/*<div className="col-xs-12 col-sm-6" style={{padding: "5px 10px"}}>
              <Button href={"/auth/facebook?redirect_back_to="+location.href}
                      bsStyle='link' 
                      className="btn btn-lg btn-social btn-facebook" 
                      target="_top" 
                      style={{width: "100%", 
                              textAlign:"center", 
                              textDecoration:"none"}}>
                <i className="fa fa-facebook"></i> With Facebook
              </Button>
            </div>
            <div className="col-xs-12 col-sm-6" style={{padding: "5px 10px"}}>
              <Button href={"/auth/twitter?redirect_back_to="+location.href} 
                      bsStyle='link' 
                      className="btn btn-lg btn-social btn-twitter" 
                      target="_top" 
                      style={{width: "100%", 
                              textAlign:"center", 
                              textDecoration:"none"}}>
                <i className="fa fa-twitter"></i> With Twitter
              </Button>
            </div>
            <p className="text-center" style={{marginBottom: "10px"}}>OR</p>*/}
            <p style={{color:"red", marginBottom:"10px"}}>{errorMsg}</p>
            <Formsy.Form  className="user-form sign_up_user" 
                          id="sign_up_user" 
                          onValidSubmit={this.submit} 
                          onValid={this.enableButton} 
                          onInvalid={this.disableButton}>
              <div className="controls">
                <FormInput  type="text" 
                            autofocus="autofocus" 
                            className="name" 
                            name="login" 
                            placeholder="Enter your username or email" 
                            required />
                <FormInput  type="password" 
                            autoComplete="off" 
                            name="password" 
                            placeholder="Enter you password" 
                            required />
                <button bsStyle="link" 
                        className="btn btn-lg btn-primary btn-block" 
                        style={{marginTop:"0.5em"}} 
                        disabled={!this.state.canSubmit} 
                        type="submit" >Sign In</button>
                <br/>
                <a onClick={this.openSignUp}>Don't have an account? SIGN UP</a>
                <br/>
                {/*<a onClick={this.closeModal}>
                  <Link to="passwordRecovery">Forgot your password?</Link>
                </a>*/}
              </div>
            </Formsy.Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
});

module.exports = SignInForm;

