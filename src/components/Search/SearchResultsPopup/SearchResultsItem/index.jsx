import React from 'react';

import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Truncate from 'react-truncate';

import classes from './styles.module.scss';

export default function SearchResultsItem({
  className,
  searchResult,
  variant,
  styles,
}) {
  const imagePath = searchResult.headerImagePath.replace(/\\/g, '/');
  return (
    <Link
      preserveNeighborhoodSelection="true"
      to={`/story/${searchResult.id}`}
      // onClick={() => {
      //  if (showStory) {
      //    showStory(searchResult);
      //  }
      // }}
      style={styles}
      className={
        variant === 'mobile'
          ? classnames(classes.SearchResultsItem, className, classes.mobile)
          : classnames(classes.SearchResultsItem, className)
      }
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}${imagePath})`,
        }}
      />
      <h1>
        <Truncate lines={2} ellipsis={<span>...</span>}>
          {searchResult.title}
        </Truncate>
      </h1>
      <div className={classes.footer}>
        <span className={classes.views}>
          <i className={classes.viewsIcon}>views</i>1202
        </span>
        <span>{searchResult.authorName}</span>
      </div>
    </Link>
  );
}
