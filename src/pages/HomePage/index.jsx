import React from 'react';

import HomeContent from './Content';
import CityMap from './CityMap';
import classes from './styles.module.scss';

export default function HomePage() {
  return (
    <div className={classes.HomePage}>
      <CityMap />
      <HomeContent />
    </div>
  );
}
