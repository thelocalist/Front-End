import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import Spinner from '../../Spinner';
import SearchResultsItem from './SearchResultsItem';
import classes from './styles.module.scss';

export default function SearchResultsPopup({
  setIsSearchResultsVisible,
  searchResults,
  resetSearch,
  zIndex,
  error,
  getNextPage,
  getPreviousPage,
  currentPage,
  storiesCount,
  pageSize,
  // setCurrentStories,
}) {
  const history = useHistory();
  const location = useLocation();
  const hideSearchResultsPopup = () => {
    if (location.state && location.state.from) {
      history.goBack();
    } else if (setIsSearchResultsVisible) {
      setIsSearchResultsVisible(false);
    } else {
      history.push('/home');
    }
    /* if (setCurrentStories) {
      setTimeout(() => {
        setCurrentStories(null);
      }, 100);
    } */
    setTimeout(() => {
      resetSearch();
    }, 100);
  };

  let content;
  if (!searchResults) {
    content = <Spinner className={classes.spinner} />;
  } else if (searchResults[0] === 'empty') {
    content = (
      <div className={classes.noSearchResults}>
        <p>Nothing found</p>
      </div>
    );
  } else {
    content = searchResults.map((searchResult) => (
      <SearchResultsItem key={searchResult.id} searchResult={searchResult} />
    ));
  }

  if (error) {
    content = <div className={classes.error}>{error.message}</div>;
  }

  return (
    <div className={classes.SearchResultsPopup} style={{ zIndex }}>
      <i
        className={classes.closeIcon}
        onClick={hideSearchResultsPopup}
        preserveNeighborhoodSelection="true"
      >
        Close
      </i>
      <div className={classes.content}>
        {content}
        <div className={classes.footer}>
          <div className={classes.switchPageButtons}>
            <i
              className={
                currentPage === 0
                  ? classnames(classes.switchPrevious, classes.disabled)
                  : classes.switchPrevious
              }
              onClick={getPreviousPage}
            >
              Left
            </i>
            <i
              className={
                currentPage + 1 >= storiesCount / pageSize
                  ? classnames(classes.switchNext, classes.disabled)
                  : classes.switchNext
              }
              onClick={getNextPage}
            >
              Right
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
