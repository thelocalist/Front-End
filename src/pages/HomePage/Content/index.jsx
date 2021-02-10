import React, { useState, useRef, useEffect } from 'react';

import classnames from 'classnames';

import Communities from './Communities';
import FeaturedStories from './FeaturedStories';
import RecentStories from './RecentStories';

import classes from './styles.module.scss';

export default function HomeContent() {
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
  let timer;

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

    if (direction === 'forward') {
      if (ref.current.scrollWidth + scrollContentPosition < window.innerWidth) {
        if (selectedMenuOption === 'communities') {
          switchTabsToRecent();
        } else if (selectedMenuOption === 'recent') {
          switchTabsToFeatured();
        } else if (selectedMenuOption === 'featured') {
          switchTabsToCommunities();
        }
        return;
      }

      setScrollContentPosition((prevState) => prevState - scrollDistance);
    } else {
      if (scrollContentPosition + scrollDistance > 0) {
        if (selectedMenuOption === 'communities') {
          switchTabsToFeatured();
        } else if (selectedMenuOption === 'recent') {
          switchTabsToCommunities();
        } else if (selectedMenuOption === 'featured') {
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
      <div className={classes.menu}>
        <ul>
          {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
          <li
            onClick={switchTabsToRecent}
            className={selectedMenuOption === 'recent' ? classes.active : null}
          >
            Recent Nearby
          </li>
          <li
            onClick={switchTabsToFeatured}
            className={
              selectedMenuOption === 'featured' ? classes.active : null
            }
          >
            Featured
          </li>
          <li
            onClick={switchTabsToCommunities}
            className={
              selectedMenuOption === 'communities' ? classes.active : null
            }
          >
            Communities
          </li>
          <li
            className={classnames(classes.line, classes[selectedMenuOption])}
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
          >
            Left
          </i>
          <i
            className={classes.switchNext}
            onClick={() => {
              scrollContent('forward');
              setIsContentScrolldManually(true);
            }}
          >
            Right
          </i>
        </div>
      </div>
      <div className={classes.content}>
        <FeaturedStories
          isVisible={selectedMenuOption === 'featured'}
          featuredStoriesRef={featuredStoriesRef}
          featuredStoriesPosition={scrollFeaturedStoriesPosition}
        />
        <RecentStories
          isVisible={selectedMenuOption === 'recent'}
          recentStoriesRef={recentStoriesRef}
          recentStoriesPosition={scrollRecentStoriesPosition}
        />
        <Communities
          isVisible={selectedMenuOption === 'communities'}
          scrollCommunitiesPosition={scrollCommunitiesPosition}
          communitiesRef={communitiesRef}
          isSearchResultsVisible={isSearchResultsVisible}
          setIsSearchResultsVisible={setIsSearchResultsVisible}
        />
      </div>
    </div>
  );
}
