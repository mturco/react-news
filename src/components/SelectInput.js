import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectInput.css';
import SelectInputOption from './SelectInputOption';
import TextInput from './TextInput';

const optionType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

class SelectInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(optionType),
    search: PropTypes.bool,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      query: '',
    };

    // bind this for handlers
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOptionClicked = this.handleOptionClicked.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  render() {
    const { value, options, search } = this.props;
    const { query } = this.state;

    let selectedLabel = '';
    if (options.length) {
      const selectedOption = options.find(opt => opt.value === value.toString()) || options[0];
      selectedLabel = selectedOption.label;
    }
    
    const optionElements = options
      .filter(opt => {
        if (!search || !query.trim().length) {
          return true;
        }
        return opt.label.toLowerCase().indexOf(query.trim().toLowerCase()) > -1;
      })
      .map(opt =>
        <SelectInputOption label={opt.label} value={opt.value} key={opt.value}
          onClick={this.handleOptionClicked}
          selected={opt.value === value.toString()}/>
      );

    return (
      <div className={`SelectInput ${this.state.isOpen ? 'is-open' : ''} ${this.props.className}`} ref={el => this.rootElement = el}>
        <div className="SelectInput-label" onClick={this.toggleDropdown}>
          {selectedLabel} <span className="SelectInput-caret"></span>
        </div>
        <div className="SelectInput-dropdown">
          <div className="SelectInput-dropdownContainer">
            {search &&
              <div className="SelectInput-searchContainer">
                <TextInput className="SelectInput-searchBox" placeholder="Search..." onChange={this.handleSearch}/>
              </div>
            }
            {optionElements}
          </div>
        </div>
      </div>
    );
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleOptionClicked(value) {
    this.setState({ isOpen: false, query: '' });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleDocumentClick(event) {
    if (!this.rootElement.contains(event.target) && this.state.isOpen) {
      this.toggleDropdown();
    }
  }

  handleSearch(event) {
    this.setState({ query: event.target.value });
  }
}

export default SelectInput;
