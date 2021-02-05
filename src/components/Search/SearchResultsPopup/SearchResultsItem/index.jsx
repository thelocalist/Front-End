import React from 'react';

import classes from './styles.module.scss';

export default function SearchResultsItem({ searchResult, styles }) {
  return (
    <div className={classes.SearchResultsItem} style={styles}>
      <div className={classes.image} />
      <h1 className={classes.searchResultHeading}>{searchResult.title}</h1>
      <div className={classes.footer}>
        <span className={classes.views}>
          <i className={classes.viewsIcon}>views</i>1202
        </span>
        <span className={classes.author}>{searchResult.authorName}</span>
      </div>
    </div>
  );
}
