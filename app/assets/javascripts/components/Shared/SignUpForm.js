var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Formsy = require('formsy-react');
// Actions
var SessionActions = require('../../actions/SessionActions');
// Components
var FormInput = require('./FormInput');

var SignUpForm = React.createClass({

  getInitialState: function() {
    return {
      showModal: false,
      canSubmit: false
    };
  },

  componentWillReceiveProps: function(nextProp){
    console.log(nextProp)
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
    var data = {username: model.username, email: model.email, password: model.password, passwordConfirmation: model.passwordConfirmation}
    SessionActions.signup(data);
  },

  openSignIn: function(){
    this.closeModal();
    this.props.openSignIn();
  },

  render: function() {
    var session = this.props.session;
    if (session.isLoggedIn == false && session.error != null){
      var errorMsg = session.error.responseJSON.error == 'Invalid_login_attempt'? '' : session.error.responseJSON.error;
    } 

    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Body style={{padding:"0"}}>
          <div style={{padding:"25px"}}>
            <div className="close" onClick={this.closeModal} style={{position:"absolute", top:"5px", right:"10px", padding:"10px", cursor:"pointer"}}><span>&times;</span></div>
            <h2>Sign Up</h2>
            {/*<div className="col-xs-12 col-sm-6" style={{padding: "5px 10px"}}>
              <Button href={"/auth/facebook?redirect_back_to="+location.href} bsStyle='link' className="btn btn-lg btn-social btn-facebook" target="_top" style={{width: "100%", textAlign:"center", textDecoration:"none"}}>
                <i className="fa fa-facebook"></i> With Facebook
              </Button>
            </div>
            <div className="col-xs-12 col-sm-6" style={{padding: "5px 10px"}}>
              <Button href={"/auth/twitter?redirect_back_to="+location.href} bsStyle='link' className="btn btn-lg btn-social btn-twitter" target="_top" style={{width: "100%", textAlign:"center", textDecoration:"none"}}>
                <i className="fa fa-twitter"></i> With Twitter
              </Button>
            </div>
            <p className="text-center" style={{marginBottom: "10px"}}>OR</p>*/}
            <p style={{color:"red", marginBottom:"10px"}}>{errorMsg}</p>
            <Formsy.Form  id="subscribe-form" 
                          className="user-form sign_up_user" 
                          id="sign_up_user" 
                          onValidSubmit={this.submit} 
                          onValid={this.enableButton} 
                          onInvalid={this.disableButton}>
              <div className="controls">
                <FormInput  type="text" 
                            validations={{matchRegexp: /^[a-zA-Z0-9_-]*$/}} 
                            validationError="This is not a valid username (letters, numbers, underscores and dashes only)" 
                            autofocus="autofocus" 
                            className="name" 
                            name="username" 
                            placeholder="Pick a username (letters, numbers, underscores and dashes only)" 
                            required />
                <FormInput  type="email" 
                            validations="isEmail" 
                            validationError="This is not a valid email" 
                            name="email" 
                            placeholder="Enter your email" 
                            required />
                <FormInput  type="password" 
                            validations="minLength:8" 
                            validationError="Password is too short (minimum is 8 characters)" 
                            autoComplete="off" 
                            name="password" 
                            placeholder="Enter your password" 
                            required />
                <FormInput  type="password" 
                            validations="equalsField:password" 
                            validationError="The password doesn't match" 
                            autoComplete="off" 
                            name="passwordConfirmation" 
                            placeholder="Please Reenter your password" 
                            required />
                <button bsStyle="link" className="btn btn-lg btn-primary btn-block" style={{marginTop:"0.5em"}} disabled={!this.state.canSubmit} type="submit" >Sign Up</button>
                <br/>
                <a onClick={this.openSignIn}>Already have an account? SIGN IN</a>
              </div>
            </Formsy.Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
});

module.exports = SignUpForm;
