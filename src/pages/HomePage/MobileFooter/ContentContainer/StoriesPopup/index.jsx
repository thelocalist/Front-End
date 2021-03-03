import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

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
  const history = useHistory();
  const location = useLocation();
  return (
    <div className={classes.StoriesPopup}>
      <div className={classes.header}>
        <h1>{storiesPopupTitle}</h1>
        <i
          preserveNeighborhoodSelection="true"
          className={classes.closeIcon}
          onClick={() => {
            closeStoriesPopup();
            if (location.state && location.state.from) {
              history.goBack();
            } else {
              history.push('/home');
            }
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
