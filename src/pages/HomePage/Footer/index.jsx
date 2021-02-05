import React, { useState, useRef } from 'react';

import Communities from './Communities';
import FeaturedStories from './FeaturedStories';
import classes from './styles.module.scss';

export default function Footer() {
  const [selectedMenuOption, setSelectedMenuOption] = useState('communities');
  const [scrollCommunitiesPosition, setScrollCommunitiesPosition] = useState(0);

  const communitiesRef = useRef();

  const scrollCommunities = (direction) => {
    if (direction === 'forward') {
      if (
        communitiesRef.current.scrollWidth + scrollCommunitiesPosition <
        window.innerWidth
      ) {
        return;
      }

      setScrollCommunitiesPosition((prevState) => prevState - 280);
    } else {
      if (scrollCommunitiesPosition + 280 > 0) {
        return;
      }
      setScrollCommunitiesPosition((prevState) => prevState + 280);
    }
  };

  return (
    <div className={classes.Footer}>
      <div className={classes.menu}>
        <ul>
          {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
          <li
            onClick={() => setSelectedMenuOption('recent')}
            className={selectedMenuOption === 'recent' ? classes.active : null}
          >
            Recent Nearby
          </li>
          <li
            onClick={() => setSelectedMenuOption('featured')}
            className={
              selectedMenuOption === 'featured' ? classes.active : null
            }
          >
            Featured
          </li>
          <li
            onClick={() => setSelectedMenuOption('communities')}
            className={
              selectedMenuOption === 'communities' ? classes.active : null
            }
          >
            Communities
          </li>
          {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
        </ul>
        <div className={classes.arrowIcons}>
          <i
            className={classes.switchPrevious}
            onClick={() => scrollCommunities('back')}
          >
            Left
          </i>
          <i
            className={classes.switchNext}
            onClick={() => scrollCommunities('forward')}
          >
            Right
          </i>
        </div>
      </div>
      <div className={classes.content}>
        {selectedMenuOption === 'communities' && (
          <Communities
            scrollCommunitiesPosition={scrollCommunitiesPosition}
            communitiesRef={communitiesRef}
          />
        )}
        {selectedMenuOption === 'featured' && <FeaturedStories />}
      </div>
    </div>
  );
}
