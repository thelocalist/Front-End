import React from 'react';
import classnames from 'classnames';

import classes from './styles.module.scss';

export default function Spinner({ className }) {
  return (
    <div className={classnames(classes.ldsRing, className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
