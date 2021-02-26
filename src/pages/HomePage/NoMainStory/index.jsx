import React from 'react';

import classnames from 'classnames';

import classes from './styles.module.scss';

export default function NoMainStory({ visible }) {
  return (
    <div
      className={
        visible ? classnames(classes.Stories, classes.visible) : classes.Stories
      }
    >
      <div className={classes.nothingFound}>
        <p>Nothing published for this location...</p>
        <p>Email Operations@thelocalist.co to contribute!</p>
      </div>
    </div>
  );
}
