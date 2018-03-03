import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SourcePicker.css';
import { getSources } from '../NewsApi';
import SelectInput from './SelectInput';

const sortByOptions = [
  { label: 'most popular first', value: 'popularity' },
  { label: 'most recent first', value: 'publishedAt' },
];

class SourcePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      selectedSource: '',
      sortBy: sortByOptions[1].value,
    };

    // bind this for handlers
    this.handleSourceChanged = this.handleSourceChanged.bind(this);
    this.handleSortByChanged = this.handleSortByChanged.bind(this);
  }

  componentDidMount() {
    getSources()
      .then(response => response.json())
      .then(result => {
        const { status, code, message, sources } = result;
        if (status === 'ok' && sources.length) {
          this.setState({ sources });
          this.handleSourceChanged(sources[0].id);
        } else {
          console.error({ status, code, message });
        }
      })
      .catch(console.error);
  }

  render() {
    const sourceOptions = this.state.sources.map(source => ({
      label: source.name,
      value: source.id,
    }));

    return (
      <div className="SourcePicker">
        View articles from
        <SelectInput className="SourcePicker-select"
          value={this.state.selectedSource}
          options={sourceOptions}
          search
          onChange={this.handleSourceChanged}/>
        sorted by
        <SelectInput className="SourcePicker-select"
          value={this.state.sortBy}
          options={sortByOptions}
          onChange={this.handleSortByChanged}/>
      </div>
    );
  }

  handleSourceChanged(value) {
    this.setState({ selectedSource: value });
    if (this.props.onChange) {
      this.props.onChange(value, this.state.sortBy);
    }
  }

  handleSortByChanged(value) {
    this.setState({ sortBy: value });
    if (this.props.onChange) {
      this.props.onChange(this.state.selectedSource, value);
    }
  }
}

export default SourcePicker;
