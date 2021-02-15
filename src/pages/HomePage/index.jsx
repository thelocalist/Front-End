import React, { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';

import HomeContent from './Content';
import MobileFooter from './MobileFooter';
import CityMap from './CityMap';
import classes from './styles.module.scss';

export default function HomePage() {
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
  const [currentNeighborhood, setCurrentNeighborhood] = useState('');
  return (
    <div className={classes.HomePage}>
      <CityMap
        areLocalStoriesFound={areLocalStoriesFound}
        setAreLocalStoriesFound={setAreLocalStoriesFound}
        currentNeighborhood={currentNeighborhood}
        setCurrentNeighborhood={setCurrentNeighborhood}
      />
      {isMobile ? (
        <MobileFooter
          setAreLocalStoriesFound={setAreLocalStoriesFound}
          currentNeighborhood={currentNeighborhood}
          setCurrentNeighborhood={setCurrentNeighborhood}
        />
      ) : (
        <HomeContent
          currentNeighborhood={currentNeighborhood}
          setAreLocalStoriesFound={setAreLocalStoriesFound}
        />
      )}
    </div>
  );
}
