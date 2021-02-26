import React, { useEffect, useContext } from 'react';
import classnames from 'classnames';

import { Context } from '../../../../context';
import NoLocalStoriesMessage from '../NoLocalStoriesMessage';
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
  setAreLocalStoriesFound,
  selectedMenuOption,
  setShouldSlidingBeStopped,
  setAreLocalFeaturedStoriesFound,
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
    if (
      stories &&
      storiesByNeighborhood &&
      stories[0] === 'empty' &&
      currentNeighborhood !== ''
    ) {
      resetSearch();
      fetchStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
        isFeatured: true,
      });
    }
    if (
      currentNeighborhood !== '' &&
      storiesByNeighborhood &&
      storiesByNeighborhood[0] === 'empty' &&
      selectedMenuOption === 'featured'
    ) {
      setAreLocalStoriesFound(false);
    } else {
      setAreLocalStoriesFound(true);
    }
  }, [selectedMenuOption]);

  useEffect(() => {
    if (
      areStoriesByNeighborhoodFetching ||
      areStoriesFetching ||
      storiesByNeighborhoodFetchingError ||
      storiesFetchingError ||
      (currentNeighborhood !== '' &&
        storiesByNeighborhood &&
        storiesByNeighborhood[0] === 'empty')
    ) {
      setShouldSlidingBeStopped(true);
    } else {
      setShouldSlidingBeStopped(false);
    }
  }, [
    areStoriesByNeighborhoodFetching,
    areStoriesFetching,
    storiesByNeighborhoodFetchingError,
    storiesFetchingError,
  ]);

  let storiesContent;

  if (
    storiesByNeighborhood &&
    storiesByNeighborhood[0] !== 'empty' &&
    !areStoriesByNeighborhoodFetching &&
    currentNeighborhood !== ''
  ) {
    setAreLocalFeaturedStoriesFound(true);
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
    !areStoriesByNeighborhoodFetching &&
    currentNeighborhood === ''
  ) {
    setAreLocalFeaturedStoriesFound(false);
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
    /* eslint-disable */
    setAreLocalFeaturedStoriesFound(false);
    storiesContent = (
      <div className={classes.spinner}>
        {storiesFetchingError || storiesByNeighborhoodFetchingError ? (
          <ErrorMessage
            message={
              storiesFetchingError
                ? storiesFetchingError.message
                : storiesByNeighborhoodFetchingError
                ? storiesByNeighborhoodFetchingError.message
                : null
            }
          />
        ) : storiesByNeighborhood && storiesByNeighborhood[0] === 'empty' ? (
          <NoLocalStoriesMessage />
        ) : (
          <Spinner />
        )}
      </div>
    );
    /* eslint-disable */
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
      {storiesContent}
    </div>
  );
}
