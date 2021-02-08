import React from 'react';

import classes from './styles.module.scss';

export default function Stories({ stories }) {
  const nothingFound = (
    <div className={classes.nothingFound}>
      <p>Nothing published for this location...</p>
      <p>Email Operations@thelocalist.co to contribute!</p>
    </div>
  );

  return (
    <div className={classes.Stories}>
      {stories[0] === 'empty' && nothingFound}
    </div>
  );
}
