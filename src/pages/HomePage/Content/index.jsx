import React, { useState, useRef, useEffect, useContext } from 'react';

import classnames from 'classnames';

import { Context } from '../../../context';
import Communities from './Communities';
import SearchResultsPopup from '../../../components/Search/SearchResultsPopup';
import FeaturedStories from './FeaturedStories';
import RecentStories from './RecentStories';
import StoryPopup from '../../../components/StoryPopup';
import Spinner from '../../../components/Spinner';
import useSearch from '../../../helpers/useSearch';
import useApiRequest from '../../../helpers/useApiRequest';

import classes from './styles.module.scss';

const PAGESIZE = 6;

export default function HomeContent({ storyId, communityId, history }) {
  const [currentNeighborhood] = useContext(Context);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState('recent');
  const [scrollCommunitiesPosition, setScrollCommunitiesPosition] = useState(0);
  const [
    scrollRecentStoriesPosition,
    setScrollRecentStoriesPosition,
  ] = useState(0);
  const [
    scrollFeaturedStoriesPosition,
    setScrollFeaturedStoriesPosition,
  ] = useState(0);
  const [isContentScrolldManually, setIsContentScrolldManually] = useState(
    false
  );
  const [isStoryPopupVisible, setIsStoryPopupVisible] = useState(false);
  const [
    isSearchResultsPopupVisible,
    setIsSearchResultsPopupVisible,
  ] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  // Content for SearchResultItemsPopup (stories by community)
  const [currentStories, setCurrentStories] = useState(null);
  const [
    shouldRecentStoriesSlidingBeStopped,
    setShouldRecentStoriesSlidingBeStopped,
  ] = useState(false);
  const [
    shouldFeaturedStoriesSlidingBeStopped,
    setShouldFeaturedStoriesSlidingBeStopped,
  ] = useState(false);
  const [
    shouldCommunitiesSlidingBeStopped,
    setShouldCommunitiesSlidingBeStopped,
  ] = useState(false);
  const [areLocalRecentStoriesFound, setAreLocalRecentStoriesFound] = useState(
    false
  );
  const [
    areLocalFeaturedStoriesFound,
    setAreLocalFeaturedStoriesFound,
  ] = useState(false);
  const [areLocalCommunitiesFound, setAreLocalCommunitiesFound] = useState(
    false
  );

  let timer;

  /* eslint-disable */
  const [
    story,
    requestStory,
    isStoryLoading,
    storyLoadingError,
  ] = useApiRequest('get', `/stories/${storyId}`);
  const [
    stories,
    getStories,
    areStoriesFetching,
    storiesFetchingError,
    storiesCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
    currentPage,
  ] = useSearch('get', '/stories/search');
  /* eslint-disable */

  const communitiesRef = useRef();
  const featuredStoriesRef = useRef();
  const recentStoriesRef = useRef();

  const switchTabsToRecent = () => {
    setSelectedMenuOption('recent');
    setTimeout(() => {
      setScrollCommunitiesPosition(0);
      setScrollFeaturedStoriesPosition(0);
    }, 500);
  };

  const switchTabsToFeatured = () => {
    setSelectedMenuOption('featured');
    setTimeout(() => {
      setScrollCommunitiesPosition(0);
      setScrollRecentStoriesPosition(0);
    }, 500);
  };

  const switchTabsToCommunities = () => {
    setSelectedMenuOption('communities');
    setTimeout(() => {
      setScrollFeaturedStoriesPosition(0);
      setScrollRecentStoriesPosition(0);
    }, 500);
  };

  const scrollContent = (direction) => {
    if (isStoryPopupVisible || isSearchResultsVisible) {
      return;
    }
    let ref;
    let scrollContentPosition;
    let setScrollContentPosition;

    switch (selectedMenuOption) {
      case 'communities':
        ref = communitiesRef;
        scrollContentPosition = scrollCommunitiesPosition;
        setScrollContentPosition = setScrollCommunitiesPosition;
        break;
      case 'featured':
        ref = featuredStoriesRef;
        scrollContentPosition = scrollFeaturedStoriesPosition;
        setScrollContentPosition = setScrollFeaturedStoriesPosition;
        break;
      case 'recent':
        ref = recentStoriesRef;
        scrollContentPosition = scrollRecentStoriesPosition;
        setScrollContentPosition = setScrollRecentStoriesPosition;
        break;
      default:
        ref = null;
    }

    const scrollDistance = Math.trunc(window.innerWidth / 320) * 320;

    console.log(
      'SCROLLWIDTH',
      ref.current.scrollWidth + scrollContentPosition,
      window.innerWidth + 25
    );

    if (direction === 'forward') {
      if (
        ref.current.scrollWidth + scrollContentPosition <=
        window.innerWidth + 25
      ) {
        if (selectedMenuOption === 'communities') {
          if (currentNeighborhood !== '' && areLocalRecentStoriesFound) {
            switchTabsToRecent();
            return;
          } else if (
            currentNeighborhood !== '' &&
            areLocalFeaturedStoriesFound
          ) {
            switchTabsToFeatured();
            return;
          } else if (currentNeighborhood !== '' && areLocalCommunitiesFound) {
            return;
          }
          switchTabsToRecent();
        } else if (selectedMenuOption === 'recent') {
          if (currentNeighborhood !== '' && areLocalFeaturedStoriesFound) {
            switchTabsToFeatured();
            return;
          } else if (currentNeighborhood !== '' && areLocalCommunitiesFound) {
            switchTabsToCommunities();
            return;
          } else if (currentNeighborhood !== '' && areLocalRecentStoriesFound) {
            return;
          }
          switchTabsToFeatured();
        } else if (selectedMenuOption === 'featured') {
          if (currentNeighborhood !== '' && areLocalCommunitiesFound) {
            switchTabsToCommunities();
            return;
          } else if (currentNeighborhood !== '' && areLocalRecentStoriesFound) {
            switchTabsToRecent();
            return;
          } else if (
            currentNeighborhood !== '' &&
            areLocalFeaturedStoriesFound
          ) {
            return;
          }
          switchTabsToCommunities();
        }
        return;
      }
      if (
        selectedMenuOption === 'communities' &&
        shouldCommunitiesSlidingBeStopped
      ) {
        switchTabsToRecent();
        return;
      } else if (
        selectedMenuOption === 'recent' &&
        shouldRecentStoriesSlidingBeStopped
      ) {
        switchTabsToFeatured();
        return;
      } else if (
        selectedMenuOption === 'featured' &&
        shouldFeaturedStoriesSlidingBeStopped
      ) {
        switchTabsToCommunities();
        return;
      }
      setScrollContentPosition((prevState) => prevState - scrollDistance);
    } else {
      if (scrollContentPosition + scrollDistance > 0) {
        if (selectedMenuOption === 'communities') {
          if (currentNeighborhood !== '' && areLocalFeaturedStoriesFound) {
            switchTabsToFeatured();
            return;
          } else if (currentNeighborhood !== '' && areLocalRecentStoriesFound) {
            switchTabsToRecent();
            return;
          } else if (currentNeighborhood !== '' && areLocalCommunitiesFound) {
            return;
          }
          switchTabsToFeatured();
        } else if (selectedMenuOption === 'recent') {
          if (currentNeighborhood !== '' && areLocalCommunitiesFound) {
            switchTabsToCommunities();
            return;
          } else if (
            currentNeighborhood !== '' &&
            areLocalFeaturedStoriesFound
          ) {
            switchTabsToFeatured();
            return;
          } else if (currentNeighborhood !== '' && areLocalRecentStoriesFound) {
            return;
          }
          switchTabsToCommunities();
        } else if (selectedMenuOption === 'featured') {
          if (currentNeighborhood !== '' && areLocalRecentStoriesFound) {
            switchTabsToRecent();
            return;
          } else if (currentNeighborhood !== '' && areLocalCommunitiesFound) {
            switchTabsToCommunities();
            return;
          } else if (
            currentNeighborhood !== '' &&
            areLocalFeaturedStoriesFound
          ) {
            return;
          }
          switchTabsToRecent();
        }
        return;
      }
      setScrollContentPosition((prevState) => prevState + scrollDistance);
    }
  };

  const scrollContentAutomatically = () => {
    scrollContent('forward');
  };

  const showStory = (story) => {
    setCurrentStory(story);
    setIsStoryPopupVisible(true);
  };

  const showStories = () => {
    setIsSearchResultsPopupVisible(true);
  };

  useEffect(() => {
    if (storyId) {
      requestStory();
    }
  }, [storyId]);

  const fetchStories = async (communityId) => {
    const queryParams = {
      keywords: '',
      filterType:
        currentNeighborhood === '' ? 'communityId' : 'communityId,neighborhood',
      filterValue:
        currentNeighborhood === ''
          ? communityId
          : `${communityId},${currentNeighborhood}`,
      pageSize: PAGESIZE,
    };

    getStories(queryParams);
  };

  useEffect(() => {
    if (communityId) {
      fetchStories(communityId);
      showStories();
    } else {
      setIsSearchResultsPopupVisible(false);
    }
  }, [communityId]);

  useEffect(() => {
    if (!isStoryLoading && story) {
      setCurrentStory(story);
      setIsStoryPopupVisible(true);
    }
  }, [isStoryLoading]);

  useEffect(() => {
    if (!storiesFetchingError && stories) {
      setCurrentStories(stories);
    }
  }, [areStoriesFetching]);

  useEffect(() => {
    if (storyLoadingError) {
      setIsStoryPopupVisible(true);
    }
  }, [storyLoadingError]);

  useEffect(() => {
    if (isSearchResultsVisible) {
      return null;
    }
    const timeoutDuration = isContentScrolldManually ? 10000 : 7000;
    timer = setTimeout(() => {
      scrollContentAutomatically();
      setIsContentScrolldManually(false);
    }, timeoutDuration);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className={classes.HomeContent}>
      {isStoryLoading ? (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={classes.menu}>
            <ul>
              {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
              <li
                onClick={switchTabsToRecent}
                className={classnames(
                  classes.borderAnimation,
                  selectedMenuOption === 'recent' ? classes.active : '',
                  areLocalRecentStoriesFound
                    ? classes.neighborhoodFilterActive
                    : ''
                )}
              >
                <span
                  className={classes.borderAnimationInner}
                  preserveNeighborhoodSelection="true"
                >
                  Recent Nearby
                </span>
              </li>
              <li
                onClick={switchTabsToFeatured}
                className={classnames(
                  classes.borderAnimation,
                  selectedMenuOption === 'featured' ? classes.active : '',
                  areLocalFeaturedStoriesFound
                    ? classes.neighborhoodFilterActive
                    : ''
                )}
              >
                <span
                  className={classes.borderAnimationInner}
                  preserveNeighborhoodSelection="true"
                >
                  Featured
                </span>
              </li>
              <li
                preserveNeighborhoodSelection="true"
                onClick={switchTabsToCommunities}
                className={classnames(
                  classes.borderAnimation,
                  selectedMenuOption === 'communities' ? classes.active : '',
                  areLocalCommunitiesFound
                    ? classes.neighborhoodFilterActive
                    : ''
                )}
              >
                <span className={classes.borderAnimationInner}>
                  Communities
                </span>
              </li>
              <li
                className={classes.borderAnimation}
                style={{ display: 'none' }}
              >
                <span className={classes.borderAnimationInner}>TEST</span>
              </li>
              <li
                className={classnames(
                  classes.line,
                  classes[selectedMenuOption]
                )}
              />
              {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
            </ul>
            <div className={classes.arrowIcons}>
              <i
                className={classes.switchPrevious}
                onClick={() => {
                  scrollContent('back');
                  setIsContentScrolldManually(true);
                }}
                preserveNeighborhoodSelection="true"
              >
                Left
              </i>
              <i
                className={classes.switchNext}
                onClick={() => {
                  scrollContent('forward');
                  setIsContentScrolldManually(true);
                }}
                preserveNeighborhoodSelection="true"
              >
                Right
              </i>
            </div>
          </div>
          <div className={classes.content}>
            <FeaturedStories
              showStory={showStory}
              isVisible={selectedMenuOption === 'featured'}
              featuredStoriesRef={featuredStoriesRef}
              featuredStoriesPosition={scrollFeaturedStoriesPosition}
              selectedMenuOption={selectedMenuOption}
              history={history}
              setShouldSlidingBeStopped={
                setShouldFeaturedStoriesSlidingBeStopped
              }
              setAreLocalFeaturedStoriesFound={setAreLocalFeaturedStoriesFound}
            />
            <RecentStories
              showStory={showStory}
              isVisible={selectedMenuOption === 'recent'}
              recentStoriesRef={recentStoriesRef}
              recentStoriesPosition={scrollRecentStoriesPosition}
              currentNeighborhood={currentNeighborhood}
              setSelectedMenuOption={setSelectedMenuOption}
              selectedMenuOption={selectedMenuOption}
              history={history}
              setShouldSlidingBeStopped={setShouldRecentStoriesSlidingBeStopped}
              setAreLocalRecentStoriesFound={setAreLocalRecentStoriesFound}
            />
            <Communities
              showStory={showStory}
              isVisible={selectedMenuOption === 'communities'}
              scrollCommunitiesPosition={scrollCommunitiesPosition}
              communitiesRef={communitiesRef}
              isSearchResultsVisible={isSearchResultsVisible}
              setIsSearchResultsVisible={setIsSearchResultsVisible}
              setShouldSlidingBeStopped={setShouldCommunitiesSlidingBeStopped}
              setAreLocalCommunitiesFound={setAreLocalCommunitiesFound}
            />
            {isStoryPopupVisible && (
              <StoryPopup
                setIsStoryPopupVisible={setIsStoryPopupVisible}
                story={currentStory}
                error={storyLoadingError}
                history={history}
              />
            )}
            {isSearchResultsPopupVisible && (
              <SearchResultsPopup
                searchResults={currentStories}
                setCurrentStories={setCurrentStories}
                zIndex={1}
                resetSearch={resetSearch}
                error={storiesFetchingError || null}
                setIsSearchResultsVisible={setIsSearchResultsPopupVisible}
                getNextPage={getNextPage}
                getPreviousPage={getPreviousPage}
                currentPage={currentPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
