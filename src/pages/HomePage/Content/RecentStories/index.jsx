import React, { useEffect } from 'react';
import classnames from 'classnames';

import Spinner from '../../../../components/Spinner';
import SearchResultItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import ErrorMessage from '../../ErrorMessage';
import useApiRequest from '../../../../helpers/useApiRequest';
import classes from './styles.module.scss';

export default function RecentStories({
  recentStoriesRef,
  recentStoriesPosition,
  isVisible,
}) {
  const [
    stories,
    fetchStories,
    isStoriesFetching,
    storiesFetchingError,
  ] = useApiRequest('get', '/stories');

  useEffect(() => {
    fetchStories({ sortField: 'createdAt', sortOrder: 'desc' });
    console.log(isStoriesFetching);
  }, []);

  return (
    <div
      className={
        isVisible
          ? classnames(classes.RecentStories, classes.visible)
          : classes.RecentStories
      }
      ref={recentStoriesRef}
      style={{ left: recentStoriesPosition, zIndex: isVisible ? 1 : 0 }}
    >
      {stories ? (
        stories.data.map((story) => (
          <SearchResultItem
            key={story.id}
            searchResult={story}
            className={classes.searchItem}
          />
        ))
      ) : (
        <div className={classes.spinner}>
          {storiesFetchingError ? (
            <ErrorMessage message={storiesFetchingError.message} />
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
}
