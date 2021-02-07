import React from 'react';

import classes from './styles.module.scss';

export default function Community({ title, click }) {
  return (
    <div className={classes.Community} onClick={click}>
      <div className={classes.image} />
      <div className={classes.heading}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
