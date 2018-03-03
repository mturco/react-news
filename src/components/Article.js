import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Article.css';
import { format, distanceInWordsStrict } from 'date-fns';

class Article extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;
    const dateTime = format(new Date(data.publishedAt), 'MMM D, YYYY [at] h:mm a');
    const timeAgo = distanceInWordsStrict(new Date(data.publishedAt), new Date()) + ' ago';

    return (
      <section className="Article">
        {data.urlToImage &&
          <div className="Article-image"
            style={{ backgroundImage: `url(${data.urlToImage})` }}>
          </div>
        }
        <div className="Article-container">
          <h1 className="Article-title">
            <a className="Article-link" href={data.url}>{data.title}</a>
          </h1>
          <p className="Article-publishedAt" title={dateTime}>{timeAgo}</p>
          <p className="Article-desc">{data.description}</p>
          <p className="Article-source">{data.source.name}</p>
        </div>
      </section>
    );
  }
}

export default Article;
