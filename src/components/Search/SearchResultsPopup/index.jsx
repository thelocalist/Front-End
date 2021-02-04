import React from 'react';

import Spinner from '../../Spinner';
import SearchResultsItem from './SearchResultsItem';
import classes from './styles.module.scss';

export default function SearchResultsPopup({
  setIsSearchResultsVisible,
  searchResults,
  searchStories,
  resetSearch,
  zIndex,
}) {
  const hideSearchResultsPopup = () => {
    setIsSearchResultsVisible(false);
    resetSearch();
  };

  const switchResultsPageForward = () => {
    searchStories(null, 'forward');
  };

  const switchResultsPageBack = () => {
    searchStories(null, 'back');
  };

  let content;

  if (!searchResults.length) {
    content = (
      <Spinner
        styles={{ alignSelf: 'center', margin: 'auto', paddingBottom: 48 }}
      />
    );
  } else {
    content = searchResults.map((searchResult) => (
      <SearchResultsItem key={searchResult.id} searchResult={searchResult} />
    ));
  }

  if (searchResults[0] === 'empty') {
    content = (
      <div className={classes.noSearchResults}>
        <p>Nothing found</p>
      </div>
    );
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
            <i
              className={classes.switchPrevious}
              onClick={switchResultsPageBack}
            >
              Left
            </i>
            <i
              className={classes.switchNext}
              onClick={switchResultsPageForward}
            >
              Right
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
