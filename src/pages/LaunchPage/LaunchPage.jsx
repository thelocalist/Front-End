import React from 'react';

import classes from './LaunchPage.module.css';
// import mapBackground from '../../assets/images/ManhattanMap.png';

export default function LaunchPage() {
  return (
    <div className={classes.LaunchPage}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        <div className={classes.heading}>
          <div className={classes.line} />
          <h1>The Localist</h1>
          <div className={classes.line} />
        </div>
        <div className={classes.releaseDate}>
          <span>Coming February 2021</span>
        </div>
      </div>
    </div>
  );
}
