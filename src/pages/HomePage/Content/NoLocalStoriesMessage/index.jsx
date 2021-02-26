import React from 'react';

import classes from './styles.module.scss';

export default function NoLocalStoriesMessage() {
  return (
    <div className={classes.NoLocalStoriesMessage}>
      <p>Nothing published for this location...</p>
      <p>Email Operations@thelocalist.co to contribute!</p>
    </div>
  );
}
