import React, { useEffect } from 'react';

import classnames from 'classnames';

import SearchResultsPopup from '../../../../components/Search/SearchResultsPopup';
import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../ErrorMessage';
import Community from './Community';
import useApiRequest from '../../../../helpers/useApiRequest';
import useApiPaginatedRequest from '../../../../helpers/useSearch';
import classes from './styles.module.scss';

const PAGESIZE = 6;

export default function Communities({
  scrollCommunitiesPosition,
  communitiesRef,
  isVisible,
  isSearchResultsVisible,
  setIsSearchResultsVisible,
}) {
  const [
    fetchedCommunities,
    fetchCommunities,
    areCommunitiesFetching,
    communitiesFetchingError,
  ] = useApiRequest('get', '/communities');

  const [
    stories,
    getStories,
    areStoriesFetching,
    storiesFetchingError,
    storiesCount,
    getPreviousPage,
    getNextPage,
  ] = useApiPaginatedRequest('get', '/stories/search');

  useEffect(() => {
    fetchCommunities();
    console.log(
      storiesCount,
      areStoriesFetching,
      storiesFetchingError,
      areCommunitiesFetching
    );
  }, []);

  const fetchStories = async (communityId, direction) => {
    const queryParams = {
      keywords: '',
      filterType: 'communityId',
      filterValue: communityId,
      // pageIndex: pageNumber,
      pageSize: PAGESIZE,
    };

    if (direction === 'forward') {
      getNextPage(queryParams);
    } else if (direction === 'back') {
      getPreviousPage(queryParams);
    } else {
      getStories(queryParams);
    }
  };

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
      {fetchedCommunities ? (
        fetchedCommunities.map((community) => (
          <Community
            title={community.title}
            image={community.imagePath}
            id={community.id}
            key={community.id}
            click={() => {
              if (!isVisible) {
                return;
              }
              setIsSearchResultsVisible(true);
              fetchStories(community.id);
            }}
          />
        ))
      ) : (
        <div className={classes.spinner}>
          {!communitiesFetchingError ? (
            <Spinner />
          ) : (
            <ErrorMessage message={communitiesFetchingError.message} />
          )}
        </div>
      )}
      {isSearchResultsVisible && (
        <SearchResultsPopup
          searchResults={stories}
          zIndex={1}
          resetSearch={() => null}
          error={storiesFetchingError || null}
          setIsSearchResultsVisible={setIsSearchResultsVisible}
          // searchResultsPage={searchResultsPage}
          searchStories={fetchStories}
        />
      )}
    </div>
  );
}
