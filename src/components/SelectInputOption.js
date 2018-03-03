import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectInputOption.css';

class SelectInputOption extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    selected: false,
  };

  constructor(props) {
    super(props);

    // bind this for handlers
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className={`SelectInputOption ${this.props.selected ? 'SelectInputOption--selected' : ''}`} onClick={this.handleClick}>
        {this.props.label}
      </div>
    );
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.value);
    }
  }
}

export default SelectInputOption;
