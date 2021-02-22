import React, { useEffect, useContext } from 'react';
import classnames from 'classnames';

import { Context } from '../../../../context';
import Spinner from '../../../../components/Spinner';
import SearchResultItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import ErrorMessage from '../../ErrorMessage';
import useSearch from '../../../../helpers/useSearch';
import useApiRequest from '../../../../helpers/useApiRequest';
import classes from './styles.module.scss';

export default function RecentStories({
  recentStoriesRef,
  recentStoriesPosition,
  isVisible,
  showStory,
  setAreLocalStoriesFound,
  setSelectedMenuOption,
  selectedMenuOption,
}) {
  /* eslint-disable */
  const [currentNeighborhood, setCurrentNeighborhood] = useContext(Context);
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
    storiesCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
  ] = useSearch('get', '/stories/search');

  /* eslint-disable */

  useEffect(() => {
    if (currentNeighborhood !== '') {
      setSelectedMenuOption('recent');
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
      });
    }

    if (currentNeighborhood === '' && !stories) {
      fetchStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    }
  }, [currentNeighborhood]);

  useEffect(() => {
    if (
      stories &&
      stories[0] === 'empty' &&
      storiesByNeighborhood &&
      currentNeighborhood !== ''
    ) {
      resetSearch();
      fetchStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    }
    if (
      storiesByNeighborhood &&
      currentNeighborhood !== '' &&
      storiesByNeighborhood[0] === 'empty' &&
      selectedMenuOption === 'recent'
    ) {
      setAreLocalStoriesFound(false);
    } else {
      setAreLocalStoriesFound(true);
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
      //setAreLocalStoriesFound(true);
      return (
        <SearchResultItem
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
      /* if (currentNeighborhood !== '') {
        setAreLocalStoriesFound(false);
      } */
      return (
        <SearchResultItem
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
        {storiesFetchingError ? (
          <ErrorMessage message={storiesFetchingError.message} />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }

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
      {storiesContent}
    </div>
  );
}
