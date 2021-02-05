import React, { useState, useRef } from 'react';

import Communities from './Communities';
import FeaturedStories from './FeaturedStories';
import classes from './styles.module.scss';

export default function Footer() {
  const [selectedMenuOption, setSelectedMenuOption] = useState('communities');
  const [scrollContentPosition, setScrollContentPosition] = useState(0);

  const communitiesRef = useRef();
  const featuredStoriesRef = useRef();

  const scrollContent = (direction) => {
    let ref;

    console.log(selectedMenuOption);

    switch (selectedMenuOption) {
      case 'communities':
        ref = communitiesRef;
        break;
      case 'featured':
        ref = featuredStoriesRef;
        break;
      default:
        ref = null;
    }

    if (direction === 'forward') {
      if (ref.current.scrollWidth + scrollContentPosition < window.innerWidth) {
        return;
      }

      setScrollContentPosition((prevState) => prevState - 280);
    } else {
      if (scrollContentPosition + 280 > 0) {
        return;
      }
      setScrollContentPosition((prevState) => prevState + 280);
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
            onClick={() => {
              setSelectedMenuOption('featured');
              setScrollContentPosition(0);
            }}
            className={
              selectedMenuOption === 'featured' ? classes.active : null
            }
          >
            Featured
          </li>
          <li
            onClick={() => {
              setSelectedMenuOption('communities');
              setScrollContentPosition(0);
            }}
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
            onClick={() => scrollContent('back')}
          >
            Left
          </i>
          <i
            className={classes.switchNext}
            onClick={() => scrollContent('forward')}
          >
            Right
          </i>
        </div>
      </div>
      <div className={classes.content}>
        {selectedMenuOption === 'communities' && (
          <Communities
            scrollCommunitiesPosition={scrollContentPosition}
            communitiesRef={communitiesRef}
          />
        )}
        {selectedMenuOption === 'featured' && (
          <FeaturedStories
            featuredStoriesRef={featuredStoriesRef}
            featuredStoriesPosition={scrollContentPosition}
          />
        )}
      </div>
    </div>
  );
}
