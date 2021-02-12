import React, { useState, useEffect } from 'react';

import HomeContent from './Content';
import MobileFooter from './MobileFooter';
import CityMap from './CityMap';
import classes from './styles.module.scss';

export default function HomePage() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const [localStoriesFound, setLocalStoriesFound] = useState([]);
  return (
    <div className={classes.HomePage}>
      <CityMap
        localStoriesFound={localStoriesFound}
        setLocalStoriesFound={setLocalStoriesFound}
      />
      <MobileFooter
        localStoriesFound={localStoriesFound}
        setLocalStoriesFound={setLocalStoriesFound}
      />
      <HomeContent />
    </div>
  );
}
