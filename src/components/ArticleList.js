import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ArticleList.css';
import * as NewsApi from '../NewsApi';

class ArticleList extends Component {
  static propTypes = {
    source: PropTypes.string,
  };

  static defaultProps = {
    source: 'google-news', // just so we have something to show initially
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    NewsApi.getArticles({
      sources: this.props.source,
    })
      .then(response => response.json())
      .then(result => {
        const { status, code, message, articles } = result;
        if (status === 'ok') {
          this.setState({ articles });
        } else {
          console.error({ status, code, message });
        }
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="ArticleList">
        {this.state.articles.map(article => <p>{article.title} ({article.source.name})</p>)}
      </div>
    );
  }
}

export default ArticleList;
