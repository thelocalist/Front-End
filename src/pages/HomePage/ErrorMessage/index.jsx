import React from 'react';

import classes from './styles.module.scss';

export default function ErrorMessage({ message }) {
  return <div className={classes.ErrorMessage}>{message}</div>;
}
