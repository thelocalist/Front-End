import React from 'react';

import Spinner from '../../../Spinner';
import SearchResultsItem from './SearchResultsItem';
import classes from './styles.module.scss';

export default function SearchResultsPopup({
  setIsSearchResultsVisible,
  searchResults,
  searchStories,
}) {
  const hideSearchResultsPopup = () => {
    setIsSearchResultsVisible(false);
  };

  const switchResultsPageForward = () => {
    searchStories(null, 'forward');
  };

  const switchResultsPageBack = () => {
    searchStories(null, 'back');
  };

  return (
    <div className={classes.SearchResultsPopup}>
      <i className={classes.closeIcon} onClick={hideSearchResultsPopup}>
        Close
      </i>
      <div className={classes.content}>
        {searchResults.length ? (
          searchResults.map((searchResult) => (
            <SearchResultsItem
              key={searchResult.id}
              searchResult={searchResult}
            />
          ))
        ) : (
          <Spinner
            styles={{ alignSelf: 'center', margin: 'auto', paddingBottom: 48 }}
          />
        )}
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
