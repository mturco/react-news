import React, { Component } from 'react';
import './App.css';
import SourcePicker from './components/SourcePicker';
import ArticleList from './components/ArticleList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      sortBy: '',
    };

    // bind this for handlers
    this.handleSourceChanged = this.handleSourceChanged.bind(this);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React News</h1>
          <SourcePicker onChange={this.handleSourceChanged}/>
        </header>

        <ArticleList source={this.state.source} sortBy={this.state.sortBy}/>

        <p className="App-credits">Powered by NewsAPI.org.</p>
      </div>
    );
  }

  handleSourceChanged(source, sortBy) {
    this.setState({ source, sortBy });
  }
}

export default App;
