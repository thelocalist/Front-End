import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import Community from '../../Content/Communities/Community';
import SearchResultItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import StoriesPopup from './StoriesPopup';

import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../ErrorMessage';
import useApiRequest from '../../../../helpers/useApiRequest';
import useSearch from '../../../../helpers/useSearch';
import classes from './styles.module.scss';

export default function ContentContainer({
  content,
  currentNeighborhood,
  setAreLocalStoriesFound,
  switchMenuOption,
}) {
  const [isStoriesPopupVisible, setIsStoriesPopupVisible] = useState(false);

  const [storiesPopupTitle, setStoriesPopupTitle] = useState('');

  /* eslint-disable */

  const [
    recentStories,
    requestRecentStories,
    areRecentStoriesLoading,
    recentStoriesLoadError,
  ] = useApiRequest('get', `/stories`);
  const [
    featuredStories,
    requestFeaturedStories,
    areFeaturedStoriesLoading,
    featuredStoriesLoadError,
  ] = useApiRequest('get', `/stories`);
  const [
    communities,
    requestCommunities,
    areCommunitiesLoading,
    communitiesLoadError,
  ] = useApiRequest('get', `/communities`);

  const [
    storiesByNeighborhood,
    fetchStoriesByNeighborhood,
    areStoriesByNeighborhoodFetching,
    storiesByNeighborhoodFetchingError,
    storiesCount,
    getPreviousPage2,
    getNextPage2,
    resetSearchStoriesByNeighborhood,
  ] = useSearch('get', '/stories/search');

  const [
    featuredStoriesByNeighborhood,
    fetchFeaturedStoriesByNeighborhood,
    areFeaturedStoriesByNeighborhoodFetching,
    featuredStoriesByNeighborhoodFetchingError,
    featuredStoriesByNeighborhoodCount,
    ,
    ,
    resetSearchFeaturedStoriesByNeighborhood,
  ] = useSearch('get', '/stories/search');

  const [
    communitiesByNeighborhood,
    fetchCommunitiesByNeighborhood,
    areCommunitiesByNeighborhoodFetching,
    communitiesByNeighborhoodFetchingError,
  ] = useSearch('get', '/communities/search');

  const [
    storiesByCommunity,
    getStoriesByCommunity,
    areStoriesByCommunityFetching,
    storiesByCommunityFetchingError,
    storiesByCommunityCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
  ] = useSearch('get', '/stories/search');
  /* eslint-disable */

  useEffect(() => {
    requestRecentStories();
    requestCommunities();
    requestFeaturedStories({ isFeatured: true });
    //setAreLocalStoriesFound(false);
  }, []);

  useEffect(() => {
    if (
      !areStoriesByNeighborhoodFetching &&
      storiesByNeighborhood &&
      storiesByNeighborhood[0] === 'empty' &&
      content === 'recent'
    ) {
      setAreLocalStoriesFound(false);
    } else if (
      !areStoriesByNeighborhoodFetching &&
      storiesByNeighborhood &&
      storiesByNeighborhood[0] !== 'empty' &&
      content === 'recent'
    ) {
      setAreLocalStoriesFound(true);
    }
  }, [areStoriesByNeighborhoodFetching, content]);

  useEffect(() => {
    if (
      !areCommunitiesByNeighborhoodFetching &&
      communitiesByNeighborhood &&
      communitiesByNeighborhood[0] === 'empty' &&
      content === 'communities'
    ) {
      setAreLocalStoriesFound(false);
    } else if (
      !areCommunitiesByNeighborhoodFetching &&
      communitiesByNeighborhood &&
      communitiesByNeighborhood[0] !== 'empty' &&
      content === 'communities'
    ) {
      setAreLocalStoriesFound(true);
    }
  }, [areCommunitiesByNeighborhoodFetching, content]);

  useEffect(() => {
    if (
      !areFeaturedStoriesByNeighborhoodFetching &&
      featuredStoriesByNeighborhood &&
      featuredStoriesByNeighborhood[0] === 'empty' &&
      content === 'featured'
    ) {
      setAreLocalStoriesFound(false);
    } else if (
      !areFeaturedStoriesByNeighborhoodFetching &&
      featuredStoriesByNeighborhood &&
      featuredStoriesByNeighborhood[0] !== 'empty' &&
      content === 'featured'
    ) {
      setAreLocalStoriesFound(true);
    }
  }, [areFeaturedStoriesByNeighborhoodFetching, content]);

  useEffect(() => {
    if (currentNeighborhood !== '') {
      switchMenuOption('recent');
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

      fetchFeaturedStoriesByNeighborhood({
        ...queryParams,
        sortField: 'createdAt',
        sortOrder: 'desc',
        isFeatured: true,
      });

      fetchCommunitiesByNeighborhood({
        ...queryParams,
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    }
  }, [currentNeighborhood]);

  useEffect(() => {
    if (
      recentStories &&
      recentStories[0] === 'empty' &&
      currentNeighborhood !== ''
    ) {
      resetSearchStoriesByNeighborhood();
      requestRecentStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    }
  }, [storiesByNeighborhood]);

  const showStoriesPopup = (community) => {
    const queryParams = {
      keywords: '',
      filterType: 'communityId',
      filterValue: community.id,
      pageSize: 100,
    };

    setIsStoriesPopupVisible(true);
    setStoriesPopupTitle(community.title);
    getStoriesByCommunity(queryParams);
  };

  const closeStoriesPopup = () => {
    setIsStoriesPopupVisible(false);
    resetSearch();
  };

  const showStory = (story) => {
    setCurrentStory(story);
    setIsStoryPopupVisible(true);
  };

  let recentStoriesContent;
  if (
    storiesByNeighborhood &&
    storiesByNeighborhood[0] !== 'empty' &&
    !areStoriesByNeighborhoodFetching &&
    currentNeighborhood !== ''
  ) {
    recentStoriesContent = storiesByNeighborhood.map((story) => {
      //setAreLocalStoriesFound(true);
      return (
        <SearchResultItem
          key={story.id}
          searchResult={story}
          variant="mobile"
          showStory={showStory}
        />
      );
    });
  } else if (
    storiesByNeighborhood &&
    storiesByNeighborhood[0] === 'empty' &&
    currentNeighborhood !== ''
  ) {
    recentStoriesContent = '';
  } else if (
    recentStories &&
    !areRecentStoriesLoading &&
    !areStoriesByNeighborhoodFetching
  ) {
    recentStoriesContent = recentStories.data.map((story) => {
      /* if (currentNeighborhood !== '') {
        setAreLocalStoriesFound(false);
      } */
      return (
        <SearchResultItem
          key={story.id}
          searchResult={story}
          variant="mobile"
          showStory={showStory}
        />
      );
    });
  } else {
    recentStoriesContent = (
      <div className={classes.spinner}>
        {recentStoriesLoadError ? (
          <ErrorMessage message={recentStoriesLoadError.message} />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }

  let communitiesContent;
  if (
    communitiesByNeighborhood &&
    communitiesByNeighborhood[0] !== 'empty' &&
    !areCommunitiesByNeighborhoodFetching &&
    currentNeighborhood !== ''
  ) {
    communitiesContent = communitiesByNeighborhood.map((community) => {
      return (
        <div
          key={community.id}
          className={classes.communityContainer}
          onClick={() => {
            showStoriesPopup(community);
          }}
        >
          <Community
            title={community.title}
            image={community.imagePath}
            variant="mobile"
          />
        </div>
      );
    });
  } else if (
    communitiesByNeighborhood &&
    communitiesByNeighborhood[0] === 'empty' &&
    currentNeighborhood !== ''
  ) {
    communitiesContent = '';
  } else if (
    communities &&
    !areCommunitiesLoading &&
    !areCommunitiesByNeighborhoodFetching
  ) {
    communitiesContent = communities.map((community) => {
      return (
        <div
          key={community.id}
          className={classes.communityContainer}
          onClick={() => {
            showStoriesPopup(community);
          }}
        >
          <Community
            title={community.title}
            image={community.imagePath}
            variant="mobile"
          />
        </div>
      );
    });
  } else {
    communitiesContent = (
      <div className={classes.spinner}>
        {communitiesLoadError ? (
          <ErrorMessage message={communitiesLoadError.message} />
        ) : communitiesByNeighborhoodFetchingError ? (
          <ErrorMessage
            message={communitiesByNeighborhoodFetchingError.message}
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }

  return (
    <div className={classes.ContentContainer}>
      {isStoriesPopupVisible && (
        <StoriesPopup
          closeStoriesPopup={closeStoriesPopup}
          storiesPopupTitle={storiesPopupTitle}
          storiesByCommunity={storiesByCommunity}
          areStoriesByCommunityFetching={areStoriesByCommunityFetching}
          storiesByCommunityFetchingError={storiesByCommunityFetchingError}
        />
      )}
      {(areRecentStoriesLoading || areCommunitiesLoading) && (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )}
      <div
        className={
          content === 'communities'
            ? classnames(
                classes.listContainer,
                classes.visible,
                classes.communities
              )
            : classnames(classes.listContainer, classes.communities)
        }
      >
        {/* {communities && !areCommunitiesLoading
          ? communities.map((community) => (
              <div
                key={community.id}
                className={classes.communityContainer}
                onClick={() => {
                  showStoriesPopup(community);
                }}
              >
                <Community
                  title={community.title}
                  image={community.imagePath}
                  variant="mobile"
                />
              </div>
            ))
          : null}
        {communitiesLoadError && (
          <ErrorMessage message={communitiesLoadError.message} />
        )} */}
        {communitiesContent}
      </div>
      <div
        className={
          content === 'recent'
            ? classnames(classes.listContainer, classes.visible)
            : classes.listContainer
        }
      >
        {recentStoriesContent}
      </div>
      <div
        className={
          content === 'featured'
            ? classnames(
                classes.listContainer,
                classes.visible,
                classes.featured
              )
            : classnames(classes.listContainer, classes.featured)
        }
      >
        {!areFeaturedStoriesLoading &&
          featuredStories &&
          currentNeighborhood === '' &&
          featuredStories.data.map((story) => (
            <SearchResultItem
              key={story.id}
              searchResult={story}
              variant="mobile"
              showStory={showStory}
            />
          ))}
        {!areFeaturedStoriesByNeighborhoodFetching &&
          featuredStoriesByNeighborhood &&
          currentNeighborhood !== '' &&
          featuredStoriesByNeighborhood[0] !== 'empty' &&
          featuredStoriesByNeighborhood.map((story) => (
            <SearchResultItem
              key={story.id}
              searchResult={story}
              variant="mobile"
              showStory={showStory}
            />
          ))}
        {featuredStoriesLoadError && (
          <ErrorMessage message={featuredStoriesLoadError.message} />
        )}
      </div>
    </div>
  );
}
