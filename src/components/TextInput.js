import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <input type="text" className={`TextInput ${className}`} {...otherProps}/>
    );
  }
}

export default TextInput;
