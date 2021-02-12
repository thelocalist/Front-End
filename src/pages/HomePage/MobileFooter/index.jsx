import React, { useState, useRef, useEffect } from 'react';

import classnames from 'classnames';

import ContentContainer from './ContentContainer';
import classes from './styles.module.scss';

export default function MobileFooter({
  localStoriesFound,
  setLocalStoriesFound,
}) {
  const [selectedMenuOption, setSelectedMenuOption] = useState('recent');
  const [linePosition, setLinePosition] = useState(null);
  const recentIconRef = useRef(null);
  const featuredIconRef = useRef(null);
  const communitiesIconRef = useRef(null);

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

    setLocalStoriesFound([]);

    setSelectedMenuOption(option);
    setLinePosition(
      ref.current.offsetLeft - (63 - ref.current.scrollWidth) / 2
    );
  };

  useEffect(() => {
    switchMenuOption(selectedMenuOption);
  }, []);

  return (
    <div className={classes.MobileFooter}>
      <div
        ref={recentIconRef}
        onClick={() => switchMenuOption('recent')}
        className={
          selectedMenuOption === 'recent'
            ? classnames(classes.recent, classes.active)
            : classes.recent
        }
      >
        <i>Recent Nearby</i>
        <span>Recent Nearby</span>
      </div>
      <div
        ref={featuredIconRef}
        onClick={() => switchMenuOption('featured')}
        className={
          selectedMenuOption === 'featured'
            ? classnames(classes.featured, classes.active)
            : classes.featured
        }
      >
        <i>Featured Stories</i>
        <span>Featured Stories</span>
      </div>
      <div
        ref={communitiesIconRef}
        onClick={() => switchMenuOption('communities')}
        className={
          selectedMenuOption === 'communities'
            ? classnames(classes.communities, classes.active)
            : classes.communities
        }
      >
        <i>Communities</i>
        <span>Communities</span>
      </div>
      <div className={classes.line} style={{ left: linePosition }} />
      <ContentContainer
        content={selectedMenuOption}
        localStoriesFound={localStoriesFound}
        setLocalStoriesFound={setLocalStoriesFound}
      />
    </div>
  );
}
