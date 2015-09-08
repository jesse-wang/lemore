var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
// var DropdownButton = require('react-bootstrap').DropdownButton;
// var MenuItem = require('react-bootstrap').MenuItem;

var TopBar = React.createClass({
  render: function() {
    const brand = <div href='#'>
                    <span style={{color:"#76cdd4", fontSize:"24px", fontWeight:"bold"}}>高高</span><span style={{color:"black", fontSize:"24px", fontWeight:"bold"}}>手</span>
                  </div>;
    return (
      <div style={{height:"50px"}}>
        <Navbar brand={brand} toggleNavKey={0} fixedTop style={{border:"none", background:"white", marginBottom:"0"}}>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem left eventKey={1} href='#'><span style={{color:"#76cdd4"}}>登录</span></NavItem>
            <NavItem eventKey={2} href='#'><span style={{color:"#76cdd4"}}>注册</span></NavItem>
            <NavItem eventKey={2} href='#'><span style={{background:"#76cdd4", padding:"5px 30px", color:"white"}}>成为高高手</span></NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = TopBar;

