import React, { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import HomeContent from './Content';
import MobileFooter from './MobileFooter';
import CityMap from './CityMap';
import classes from './styles.module.scss';

export default function HomePage({ history, location }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const [areLocalStoriesFound, setAreLocalStoriesFound] = useState(true);
  const [mobileContentHeight, setMobileContentHeight] = useState(null);

  const { id } = useParams();

  return (
    <div
      className={classes.HomePage}
      style={{
        zIndex:
          location.pathname.includes('story') ||
          (location.pathname.includes('community') && isMobile)
            ? 1
            : 0,
      }}
    >
      <CityMap
        areLocalStoriesFound={areLocalStoriesFound}
        location={location}
        mobileContentHeight={mobileContentHeight}
      />
      {isMobile ? (
        <MobileFooter
          setAreLocalStoriesFound={setAreLocalStoriesFound}
          history={history}
          storyId={location.pathname.includes('story') ? id : null}
          communityId={location.pathname.includes('community') ? id : null}
          setMobileContentHeight={setMobileContentHeight}
        />
      ) : (
        <HomeContent
          history={history}
          storyId={location.pathname.includes('story') ? id : null}
          communityId={location.pathname.includes('community') ? id : null}
        />
      )}
    </div>
  );
}
