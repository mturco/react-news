import React, { Component } from 'react';
import './App.css';
import ArticleList from './components/ArticleList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React News</h1>
        </header>

        <ArticleList/>
      </div>
    );
  }
}

export default App;
