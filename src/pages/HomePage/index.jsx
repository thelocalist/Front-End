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

  const { id } = useParams();

  return (
    <div className={classes.HomePage}>
      <CityMap
        areLocalStoriesFound={areLocalStoriesFound}
        setAreLocalStoriesFound={setAreLocalStoriesFound}
        location={location}
      />
      {isMobile ? (
        <MobileFooter
          setAreLocalStoriesFound={setAreLocalStoriesFound}
          history={history}
          storyId={id}
        />
      ) : (
        <HomeContent
          history={history}
          setAreLocalStoriesFound={setAreLocalStoriesFound}
          storyId={id}
        />
      )}
    </div>
  );
}
