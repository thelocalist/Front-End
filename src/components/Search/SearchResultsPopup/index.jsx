import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import Spinner from '../../Spinner';
import SearchResultsItem from './SearchResultsItem';
import classes from './styles.module.scss';

export default function SearchResultsPopup({
  // setIsSearchResultsVisible,
  searchResults,
  resetSearch,
  zIndex,
  error,
  getNextPage,
  getPreviousPage,
}) {
  const history = useHistory();
  const location = useLocation();
  const hideSearchResultsPopup = () => {
    // setIsSearchResultsVisible(false);
    if (location.state && location.state.from) {
      history.goBack();
    } else {
      history.push('/home');
    }
    resetSearch();
  };
  console.log(location.state);
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
            <i className={classes.switchPrevious} onClick={getPreviousPage}>
              Left
            </i>
            <i className={classes.switchNext} onClick={getNextPage}>
              Right
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
