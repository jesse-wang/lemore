/** @jsx React.DOM */
var React = require('react');
var Formsy = require('formsy-react');
var Input = require('react-bootstrap').Input;

var FormInputGroup = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  getInitialState: function() {
    return {
      placeholder: this.props.placeholder
    };
  },

  // setValue() will set the value of the component, which in 
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
    if(this.props.onChange){
      this.props.onChange(event.currentTarget.value);
    }
  },
    
  setPlaceholder: function(text) {
    this.setState({
      placeholder: text
    });
  },

  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true 
    // when the value is empty and the required prop is 
    // passed to the input. showError() is true when the 
    // value typed is invalid
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <Input buttonAfter={this.props.buttonAfter} style={this.props.style} size={this.props.size} autoComplete={this.props.autoComplete} autofocus={this.props.autofocus} id={this.props.id} type={this.props.type} className={this.props.className} placeholder={this.state.placeholder} onChange={this.changeValue} value={this.getValue()} required={this.props.required}/>
        <span style={{display: 'block', color:'red', margin:'-0.5em 0 0.5em 0'}}>{errorMessage}</span> 
      </div>
    );
  }
});

module.exports = FormInputGroup;