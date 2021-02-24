import React from 'react';

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
  // showStory,
}) {
  const hideSearchResultsPopup = () => {
    setIsSearchResultsVisible(false);
    resetSearch();
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
      <SearchResultsItem
        key={searchResult.id}
        searchResult={searchResult}
        // showStory={showStory}
      />
    ));
  }

  if (error) {
    content = <div className={classes.error}>{error.message}</div>;
  }

  return (
    <div className={classes.SearchResultsPopup} style={{ zIndex }}>
      <i className={classes.closeIcon} onClick={hideSearchResultsPopup}>
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
