import React, { useState, useRef, useEffect, useContext } from 'react';

import classnames from 'classnames';

import StoryPopup from '../../../components/StoryPopup';
import useApiRequest from '../../../helpers/useApiRequest';
import { Context } from '../../../context';
import ContentContainer from './ContentContainer';
import classes from './styles.module.scss';

export default function MobileFooter({
  setAreLocalStoriesFound,
  storyId,
  communityId,
  history,
}) {
  const [currentNeighborhood, , , setIsMobileStoryOpened] = useContext(Context);
  const [selectedMenuOption, setSelectedMenuOption] = useState('featured');
  const [isStoryPopupVisible, setIsStoryPopupVisible] = useState(false);
  const [linePosition, setLinePosition] = useState(null);
  const [currentStory, setCurrentStory] = useState(null);

  const recentIconRef = useRef(null);
  const featuredIconRef = useRef(null);
  const communitiesIconRef = useRef(null);

  /* eslint-disable */
  const [
    story,
    requestStory,
    isStoryLoading,
    storyLoadingError,
  ] = useApiRequest('get', `/stories/${storyId}`);
  /* eslint-disable */

  const switchMenuOption = (option) => {
    let ref;
    switch (option) {
      case 'recent':
        ref = recentIconRef;
        break;
      case 'featured':
        ref = featuredIconRef;
        break;
      case 'communities':
        ref = communitiesIconRef;
        break;
      default:
        ref = null;
    }

    setSelectedMenuOption(option);
    setLinePosition(
      ref.current.offsetLeft - (63 - ref.current.scrollWidth) / 2
    );
  };

  useEffect(() => {
    switchMenuOption(selectedMenuOption);
  }, []);

  useEffect(() => {
    if (storyId) {
      requestStory();
    }
  }, [storyId]);

  useEffect(() => {
    if (!isStoryLoading && story) {
      setCurrentStory(story);
      setIsStoryPopupVisible(true);
    }
  }, [isStoryLoading]);

  useEffect(() => {
    if (storyLoadingError) {
      setIsStoryPopupVisible(true);
    }
  }, [storyLoadingError]);

  useEffect(() => {
    if (isStoryPopupVisible) {
      setIsMobileStoryOpened(true);
    } else {
      setIsMobileStoryOpened(false);
    }
  }, [isStoryPopupVisible]);

  return (
    <div className={classes.MobileFooter}>
      <div
        preserveNeighborhoodSelection="true"
        ref={recentIconRef}
        onClick={() => switchMenuOption('recent')}
        className={
          selectedMenuOption === 'recent'
            ? classnames(classes.recent, classes.active)
            : classes.recent
        }
      >
        <i preserveNeighborhoodSelection="true">Recent Nearby</i>
        <span
          className={classes.buttonText}
          preserveNeighborhoodSelection="true"
        >
          Recent Nearby
        </span>
      </div>
      <div
        preserveNeighborhoodSelection="true"
        ref={featuredIconRef}
        onClick={() => switchMenuOption('featured')}
        className={
          selectedMenuOption === 'featured'
            ? classnames(classes.featured, classes.active)
            : classes.featured
        }
      >
        <i preserveNeighborhoodSelection="true">Featured Stories</i>
        <span
          className={classes.buttonText}
          preserveNeighborhoodSelection="true"
        >
          Featured Stories
        </span>
      </div>
      <div
        ref={communitiesIconRef}
        preserveNeighborhoodSelection="true"
        onClick={() => switchMenuOption('communities')}
        className={
          selectedMenuOption === 'communities'
            ? classnames(classes.communities, classes.active)
            : classes.communities
        }
      >
        <i>Communities</i>
        <span className={classes.buttonText}>Communities</span>
      </div>
      <div className={classes.line} style={{ left: linePosition }} />
      <ContentContainer
        content={selectedMenuOption}
        setAreLocalStoriesFound={setAreLocalStoriesFound}
        currentNeighborhood={currentNeighborhood}
        switchMenuOption={switchMenuOption}
        communityId={communityId}
      />
      {isStoryPopupVisible && (
        <StoryPopup
          setIsStoryPopupVisible={setIsStoryPopupVisible}
          story={currentStory}
          error={storyLoadingError}
          history={history}
        />
      )}
    </div>
  );
}
