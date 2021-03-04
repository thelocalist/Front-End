import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
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

  const searchResultItemRef = useRef();
  const location = useLocation();

  useEffect(() => {
    console.log(searchResultItemRef.current.clientHeight);
  }, []);

  return (
    <Link
      preserveNeighborhoodSelection="true"
      to={{
        pathname: `/story/${searchResult.id}`,
        state: { from: location.pathname },
      }}
      ref={searchResultItemRef}
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
        <Truncate
          lines={
            searchResultItemRef.current &&
            searchResultItemRef.current.clientHeight < 248
              ? 1
              : 2
          }
          ellipsis={<span>...</span>}
        >
          {searchResult.title}
        </Truncate>
      </h1>
      <div className={classes.footer}>
        <span className={classes.views}>
          <i className={classes.viewsIcon}>views</i>
          {searchResult.viewCount}
        </span>
        <span>{searchResult.authorName}</span>
      </div>
    </Link>
  );
}
