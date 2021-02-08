import React from 'react';
import classnames from 'classnames';

import classes from './styles.module.scss';

export default function SearchResultsItem({ className, searchResult }) {
  const imagePath = searchResult.headerImagePath.replace(/\\/g, '/');
  return (
    <div className={classnames(classes.SearchResultsItem, className)}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}${imagePath})`,
        }}
      />
      <h1>{searchResult.title}</h1>
      <div className={classes.footer}>
        <span className={classes.views}>
          <i className={classes.viewsIcon}>views</i>1202
        </span>
        <span>{searchResult.authorName}</span>
      </div>
    </div>
  );
}
