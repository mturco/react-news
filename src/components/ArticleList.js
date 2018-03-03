import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ArticleList.css';
import * as NewsApi from '../NewsApi';
import Article from './Article';

class ArticleList extends Component {
  static propTypes = {
    source: PropTypes.string,
    sortBy: PropTypes.string,
  };

  static defaultProps = {
    source: 'google-news', // just so we have something to show initially
    sortBy: 'publishedAt',
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentWillReceiveProps (nextProps) {
    NewsApi.getArticles({
      sources: nextProps.source || ArticleList.defaultProps.source,
      sortBy: nextProps.sortBy || ArticleList.defaultProps.sortBy,
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
    const articles = this.state.articles.map(article =>
      <Article data={article} key={article.url}/>
    );
    return (
      <div className="ArticleList">
        {articles}
      </div>
    );
  }
}

export default ArticleList;
