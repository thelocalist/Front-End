import React from 'react';

import HomeContent from './Content';
import classes from './styles.module.scss';

export default function HomePage() {
  return (
    <div className={classes.HomePage}>
      <HomeContent />
    </div>
  );
}
