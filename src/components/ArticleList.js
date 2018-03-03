import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ArticleList.css';
import * as NewsApi from '../NewsApi';
import Article from './Article';
import Button from './Button';

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
      page: 1,
    };

    // bind this for handlers
    this.handleViewMore = this.handleViewMore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.loadArticles({
      sources: nextProps.source,
      sortBy: nextProps.sortBy,
    }).then(articles => this.setState({ articles }));
  }

  render() {
    const articles = this.state.articles.map(article =>
      <Article data={article} key={article.url}/>
    );
    return (
      <div className="ArticleList">
        <div className="ArticleList-container">
          {articles}
        </div>
        <Button className="ArticleList-moreBtn" onClick={this.handleViewMore}>View More</Button>
      </div>
    );
  }

  loadArticles(params) {
    return NewsApi.getArticles(params)
      .then(response => response.json())
      .then(result => {
        const { status, code, message, articles } = result;
        if (status === 'ok') {
          return articles;
        } else {
          console.error({ status, code, message });
          return [];
        }
      })
      .catch(console.error);
  }

  handleViewMore() {
    const { source, sortBy } = this.props;
    this.loadArticles({ sources: source, sortBy, page: this.state.page + 1 })
      .then(articles => {
        this.setState({
          articles: [...this.state.articles, ...articles],
          page: this.state.page + 1,
        });
      });
  }
}

export default ArticleList;
