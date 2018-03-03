import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <button className={`Button ${className}`} {...otherProps}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
