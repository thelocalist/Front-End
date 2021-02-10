import React, { useState } from 'react';

import HomeContent from './Content';
import MobileFooter from './MobileFooter';
import CityMap from './CityMap';
import classes from './styles.module.scss';

export default function HomePage() {
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
