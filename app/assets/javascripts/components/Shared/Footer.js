var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Footer = React.createClass({
  render: function() {
    const brand = <div href='#'>
                    <span style={{color:"#76cdd4", fontSize:"24px", fontWeight:"bold"}}>高高</span><span style={{color:"black", fontSize:"24px", fontWeight:"bold"}}>手</span>
                  </div>;

    return (
      <div>
        <Navbar brand={brand} toggleNavKey={0} fixedBottom>
          
        </Navbar>
      </div>
    );
  }
});

module.exports = Footer;

