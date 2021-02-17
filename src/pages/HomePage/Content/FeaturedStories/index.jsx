import React, { useEffect, useContext } from 'react';
import classnames from 'classnames';

import { Context } from '../../../../context';
import SearchResultsItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../ErrorMessage';
import useApiRequest from '../../../../helpers/useApiRequest';
import useSearch from '../../../../helpers/useSearch';
import classes from './styles.module.scss';

export default function FeaturedStories({
  featuredStoriesPosition,
  featuredStoriesRef,
  isVisible,
  showStory,
  // setAreLocalStoriesFound,
}) {
  const [currentNeighborhood] = useContext(Context);
  const [
    stories,
    fetchStories,
    areStoriesFetching,
    storiesFetchingError,
  ] = useApiRequest('get', '/stories');
  const [
    storiesByNeighborhood,
    fetchStoriesByNeighborhood,
    areStoriesByNeighborhoodFetching,
    storiesByNeighborhoodFetchingError,
    ,
    ,
    ,
    resetSearch,
  ] = useSearch('get', '/stories/search');

  useEffect(() => {
    if (currentNeighborhood !== '') {
      const queryParams = {
        keywords: '',
        filterType: 'neighborhood',
        filterValue: currentNeighborhood.toLowerCase(),
        pageSize: 100,
      };

      fetchStoriesByNeighborhood({
        ...queryParams,
        sortField: 'createdAt',
        sortOrder: 'desc',
        isFeatured: true,
      });
    }

    if (currentNeighborhood === '' && !stories) {
      fetchStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
        isFeatured: true,
      });
    }
  }, [currentNeighborhood]);

  useEffect(() => {
    if (stories && stories[0] === 'empty' && currentNeighborhood !== '') {
      resetSearch();
      fetchStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
        isFeatured: true,
      });
    }
  }, [storiesByNeighborhood]);

  let storiesContent;

  if (
    storiesByNeighborhood &&
    storiesByNeighborhood[0] !== 'empty' &&
    !areStoriesByNeighborhoodFetching &&
    currentNeighborhood !== ''
  ) {
    storiesContent = storiesByNeighborhood.map((story) => {
      return (
        <SearchResultsItem
          key={story.id}
          searchResult={story}
          className={classes.searchItem}
          styles={{ marginLeft: 'auto' }}
          showStory={showStory}
        />
      );
    });
  } else if (
    stories &&
    !areStoriesFetching &&
    !areStoriesByNeighborhoodFetching
  ) {
    storiesContent = stories.data.map((story) => {
      return (
        <SearchResultsItem
          key={story.id}
          searchResult={story}
          className={classes.searchItem}
          styles={{ marginLeft: 'auto' }}
          showStory={showStory}
        />
      );
    });
  } else {
    storiesContent = (
      <div className={classes.spinner}>
        {storiesFetchingError || storiesByNeighborhoodFetchingError ? (
          <ErrorMessage message={storiesFetchingError.message} />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }

  return (
    <div
      className={classnames(
        classes.FeaturedStories,
        isVisible && classes.visible
      )}
      style={{ left: featuredStoriesPosition, zIndex: isVisible ? 1 : 0 }}
      ref={featuredStoriesRef}
    >
      {/* {stories ? (
        stories.data.map((story) => (
          <SearchResultsItem
            showStory={showStory}
            key={story.id}
            searchResult={story}
            className={classes.searchItem}
            styles={{ marginLeft: 'auto' }}
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
      )} */}
      {storiesContent}
    </div>
  );
}
