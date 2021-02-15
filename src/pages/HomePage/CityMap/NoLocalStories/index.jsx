import React from 'react';

import classes from './styles.module.scss';

export default function Stories() {
  return (
    <div className={classes.Stories}>
      <div className={classes.nothingFound}>
        <p>Nothing published for this location...</p>
        <p>Email Operations@thelocalist.co to contribute!</p>
      </div>
    </div>
  );
}
