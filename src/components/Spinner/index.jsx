import React from 'react';
import classes from './styles.module.scss';

export default function Spinner({ styles }) {
  return (
    <div className={classes.ldsRing} style={styles}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
