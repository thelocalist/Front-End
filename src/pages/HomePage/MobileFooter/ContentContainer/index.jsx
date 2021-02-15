import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import Community from '../../Content/Communities/Community';
import SearchResultItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import StoriesPopup from './StoriesPopup';
import StoryPopup from '../../../../components/StoryPopup';
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
  const [isStoryPopupVisible, setIsStoryPopupVisible] = useState(false);
  const [storiesPopupTitle, setStoriesPopupTitle] = useState('');
  const [currentStory, setCurrentStory] = useState(null);

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
    storiesByLocation,
    fetchStoriesByLocation,
    areStoriesByLocationFetching,
    storiesByLocationFetchingError,
    storiesCount,
    getPreviousPage2,
    getNextPage2,
    resetSearchStoriesByLocation,
  ] = useSearch('get', '/stories/search');

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
  }, []);

  useEffect(() => {
    if (currentNeighborhood !== '') {
      switchMenuOption('recent');
      const queryParams = {
        keywords: '',
        filterType: 'location',
        filterValue: currentNeighborhood.toLowerCase(),
        pageSize: 100,
      };

      fetchStoriesByLocation({
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
      resetSearchStoriesByLocation();
      requestRecentStories({
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    }
  }, [storiesByLocation]);

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
    storiesByLocation &&
    storiesByLocation[0] !== 'empty' &&
    !areStoriesByLocationFetching &&
    currentNeighborhood !== ''
  ) {
    recentStoriesContent = storiesByLocation.map((story) => {
      setAreLocalStoriesFound(true);
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
    storiesByLocation &&
    storiesByLocation[0] === 'empty' &&
    currentNeighborhood !== ''
  ) {
    setAreLocalStoriesFound(false);
    recentStoriesContent = '';
  } else if (
    recentStories &&
    !areRecentStoriesLoading &&
    !areStoriesByLocationFetching
  ) {
    recentStoriesContent = recentStories.data.map((story) => {
      if (currentNeighborhood !== '') {
        setAreLocalStoriesFound(false);
      }
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
        {communities && !areCommunitiesLoading
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
        )}
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
          featuredStories.data.map((story) => (
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
      {isStoryPopupVisible && (
        <StoryPopup
          story={currentStory}
          setIsStoryPopupVisible={setIsStoryPopupVisible}
        />
      )}
    </div>
  );
}
