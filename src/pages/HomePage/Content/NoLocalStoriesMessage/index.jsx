import React from 'react';

import classes from './styles.module.scss';

export default function NoLocalStoriesMessage({ isOnlyOneStoryPublished }) {
  return (
    <div
      className={classes.NoLocalStoriesMessage}
      style={{ left: isOnlyOneStoryPublished ? '1vw' : '0' }}
    >
      <p>
        {isOnlyOneStoryPublished
          ? 'Only one story published for this location...'
          : 'Nothing published for this location...'}
      </p>
      <p>Email Operations@thelocalist.co to contribute!</p>
    </div>
  );
}
