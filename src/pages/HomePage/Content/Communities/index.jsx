import React, { useEffect, useContext } from 'react';

import classnames from 'classnames';

import NoLocalStoriesMessage from '../NoLocalStoriesMessage';
import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../ErrorMessage';
import Community from './Community';
import useApiRequest from '../../../../helpers/useApiRequest';
import useSearch from '../../../../helpers/useSearch';
import { Context } from '../../../../context/index';
import classes from './styles.module.scss';

const PAGESIZE = 6;

export default function Communities({
  scrollCommunitiesPosition,
  communitiesRef,
  isVisible,
  setShouldSlidingBeStopped,
  setAreLocalCommunitiesFound,
}) {
  /* eslint-disable */
  const [
    fetchedCommunities,
    fetchCommunities,
    areCommunitiesFetching,
    communitiesFetchingError,
  ] = useApiRequest('get', '/communities');

  const [
    communitiesByNeighborhood,
    fetchCommunitiesByNeighborhood,
    areCommunitiesByNeighborhoodFetching,
    communitiesByNeighborhoodFetchingError,
  ] = useSearch('get', '/communities/search');

  const [
    stories,
    getStories,
    areStoriesFetching,
    storiesFetchingError,
    storiesCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
  ] = useSearch('get', '/stories/search');

  const [currentNeighborhood] = useContext(Context);

  /* eslint-disable */

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (currentNeighborhood !== '') {
      const queryParams = {
        keywords: '',
        filterType: 'neighborhood',
        filterValue: currentNeighborhood.toLowerCase(),
        pageSize: 100,
      };

      fetchCommunitiesByNeighborhood({
        ...queryParams,
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    }

    if (currentNeighborhood === '' && !stories) {
      fetchCommunities();
    }
  }, [currentNeighborhood]);

  const fetchStories = async (communityId) => {
    const queryParams = {
      keywords: '',
      filterType: 'communityId',
      filterValue: communityId,
      // pageIndex: pageNumber,
      pageSize: PAGESIZE,
    };

    getStories(queryParams);
  };

  let communitiesContent;

  if (
    fetchedCommunities &&
    currentNeighborhood === '' &&
    !areCommunitiesFetching &&
    !communitiesFetchingError
  ) {
    setAreLocalCommunitiesFound(false);
    setShouldSlidingBeStopped(false);
    communitiesContent = fetchedCommunities.map((community) => (
      <Community
        title={community.title}
        image={community.imagePath}
        id={community.id}
        key={community.id}
      />
    ));
  } else if (
    communitiesByNeighborhood &&
    communitiesByNeighborhood[0] !== 'empty' &&
    currentNeighborhood !== '' &&
    !areCommunitiesByNeighborhoodFetching &&
    !communitiesByNeighborhoodFetchingError
  ) {
    setAreLocalCommunitiesFound(true);
    setShouldSlidingBeStopped(false);
    communitiesContent = communitiesByNeighborhood.map((community) => (
      <Community
        title={community.title}
        image={community.imagePath}
        id={community.id}
        key={community.id}
      />
    ));
  } else if (areCommunitiesByNeighborhoodFetching || areCommunitiesFetching) {
    setAreLocalCommunitiesFound(false);
    setShouldSlidingBeStopped(true);
    communitiesContent = (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    );
  } else if (
    communitiesFetchingError ||
    communitiesByNeighborhoodFetchingError
  ) {
    setAreLocalCommunitiesFound(false);
    setShouldSlidingBeStopped(true);
    communitiesContent = (
      <div className={classes.spinner}>
        <ErrorMessage message={communitiesFetchingError.message} />
      </div>
    );
  } else {
    setAreLocalCommunitiesFound(false);
    setShouldSlidingBeStopped(true);
    communitiesContent = (
      <div className={classes.spinner}>
        <NoLocalStoriesMessage />
      </div>
    );
  }

  return (
    <div
      className={
        isVisible
          ? classnames(classes.Communities, classes.visible)
          : classes.Communities
      }
      style={{ left: scrollCommunitiesPosition, zIndex: isVisible ? 1 : 0 }}
      ref={communitiesRef}
    >
      {communitiesContent}
    </div>
  );
}
