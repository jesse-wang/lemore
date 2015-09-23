var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var FormInputGroup = require('../Shared/FormInputGroup');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;

var Footer = React.createClass({
  render: function() {
    const brand = <div href='#'>
                    <span style={{color:"#76cdd4", fontSize:"24px", fontWeight:"bold"}}>高高</span><span style={{color:"black", fontSize:"24px", fontWeight:"bold"}}>手</span>
                  </div>;

    const subscribeBtn =  <OverlayTrigger trigger="click" rootClose placement="top" overlay={<Popover>抱歉，此功能还未开放</Popover>}>
                            <button className="btn" style={{background:"#06a79d", borderRadius:"0", color:"white", padding:"5px 10px"}}>SUBSCRIBE</button>
                          </OverlayTrigger>;

    return (
      <section>
        <div style={{background:"#586166", padding:"40px 10px 10px 10px"}}>
          <div className="col-md-2 col-sm-3 col-xs-6">
            <p style={{color:"white"}}>Company</p>
            <p style={{color:"#aaabad"}}>
              Our Team
              <br/>
              Careers
              <br/>
              Blog
              <br/>
              Contact Us
            </p>
          </div>

          <div className="col-md-2 col-sm-3 col-xs-6">
            <p style={{color:"white"}}>Support</p>
            <p style={{color:"#aaabad"}}>
              Customer Service
              <br/>
              Authenticity Check
              <br/>
              Downloads
              <br/>
              FAQ
            </p>
          </div>

          <div className="col-md-2 col-sm-3 col-xs-6">
            <p style={{color:"white"}}>Relations</p>
            <p style={{color:"#aaabad"}}>
              Partnerships
              <br/>
              Reviews
              <br/>
              Press
              <br/>
              News
            </p>
          </div>

          <div className="col-md-2 col-sm-3 col-xs-6" style={{marginBottom:"20px"}}>
            <p style={{color:"white"}}>Follow</p>
            <p style={{color:"#aaabad"}}>
              Facebook
              <br/>
              Twitter
              <br/>
              Instagram
              <br/>
              Linkedin
            </p>
          </div>

          <div className="col-md-4">
            <Formsy.Form className="user-form" onValidSubmit={this.submit}>
              <div className="controls">
                <FormInputGroup name="search" type="email" buttonAfter={subscribeBtn} style={{borderRadius:"0", height:"32px"}} placeholder="Enter email address" />
              </div>
            </Formsy.Form>

            <p style={{color:"white", marginTop:"20px", display:"inline-block"}}>Language Selector: </p>

            <DropdownButton title='English' style={{color:"#aaabad"}}>
              <MenuItem eventKey='1'>English</MenuItem>
              <MenuItem eventKey='1'>中文</MenuItem>
            </DropdownButton>
          </div>

          <div style={{clear:"both"}}></div>
        </div>

        <div style={{background:"#2f2d2e", padding:"20px 10px"}}>
          <h4 style={{color:"white", margin:"13px 0", display:"inline-block"}}>LEMORE LAB</h4>
          <p style={{color:"white"}}>440. N. Wolfe Rd, #E094, Sunnyvale, CA, 94085<br/>© All rights reserved 2015 by LeMore LLC.</p>
        </div>
      </section>
    );
  }
});

module.exports = Footer;

