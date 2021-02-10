import React from 'react';

import SearchResultsItem from '../../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../../../../../components/Spinner';
import ErrorMessage from '../../../ErrorMessage';
import classes from './styles.module.scss';

export default function StoriesPopup({
  closeStoriesPopup,
  storiesPopupTitle,
  storiesByCommunity,
  areStoriesByCommunityFetching,
  storiesByCommunityFetchingError,
}) {
  console.log('FROM STORIES POPUP', storiesByCommunity);
  return (
    <div className={classes.StoriesPopup}>
      <div className={classes.header}>
        <h1>{storiesPopupTitle}</h1>
        <i
          className={classes.closeIcon}
          onClick={() => {
            closeStoriesPopup();
          }}
        >
          Close
        </i>
      </div>
      <div className={classes.content}>
        {storiesByCommunity &&
          storiesByCommunity[0] !== 'empty' &&
          storiesByCommunity.map((story) => (
            <SearchResultsItem
              key={story.id}
              searchResult={story}
              variant="mobile"
            />
          ))}
        {areStoriesByCommunityFetching && (
          <div className={classes.spinner}>
            <Spinner />
          </div>
        )}
        {storiesByCommunity && storiesByCommunity[0] === 'empty' && (
          <div className={classes.spinner}>
            <ErrorMessage message="Nothing found" />
          </div>
        )}
        {storiesByCommunityFetchingError && (
          <div className={classes.spinner}>
            <ErrorMessage message={storiesByCommunityFetchingError.message} />
          </div>
        )}
      </div>
    </div>
  );
}
