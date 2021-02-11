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
  localStoriesFound,
  setLocalStoriesFound,
}) {
  const [isStoriesPopupVisible, setIsStoriesPopupVisible] = useState(false);
  const [storiesPopupTitle, setStoriesPopupTitle] = useState('');

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
    storiesByCommunity,
    getStoriesByCommunity,
    areStoriesByCommunityFetching,
    storiesByCommunityFetchingError,
    storiesByCommunityCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
  ] = useSearch('get', '/stories/search');

  useEffect(() => {
    requestRecentStories();
    requestCommunities();
    requestFeaturedStories({ isFeatured: true });
    console.log(
      recentStories,
      areRecentStoriesLoading,
      recentStoriesLoadError,
      areCommunitiesLoading,
      communitiesLoadError,
      communities,
      featuredStoriesLoadError,
      requestCommunities,
      requestRecentStories,
      storiesByCommunity,
      areStoriesByCommunityFetching,
      storiesByCommunityFetchingError,
      storiesByCommunityCount,
      getPreviousPage,
      getNextPage,
      resetSearch
    );
  }, []);

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
    setLocalStoriesFound([]);
    resetSearch();
  };

  return (
    <div
      className={
        !localStoriesFound.length
          ? classes.ContentContainer
          : classnames(classes.ContentContainer, classes.hide)
      }
    >
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
            ? classnames(classes.listContainer, classes.visible)
            : classes.listContainer
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
        {!areRecentStoriesLoading &&
          recentStories &&
          recentStories.data.map((story) => (
            <SearchResultItem
              key={story.id}
              searchResult={story}
              variant="mobile"
            />
          ))}
        {recentStoriesLoadError && (
          <ErrorMessage message={recentStoriesLoadError.message} />
        )}
      </div>
      <div
        className={
          content === 'featured'
            ? classnames(classes.listContainer, classes.visible)
            : classes.listContainer
        }
      >
        {!areFeaturedStoriesLoading &&
          featuredStories &&
          featuredStories.data.map((story) => (
            <SearchResultItem
              key={story.id}
              searchResult={story}
              variant="mobile"
            />
          ))}
        {featuredStoriesLoadError && (
          <ErrorMessage message={featuredStoriesLoadError.message} />
        )}
      </div>
    </div>
  );
}
