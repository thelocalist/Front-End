import React from 'react';
import classnames from 'classnames';

import { STATIC_URL } from '../../../../../constants/main';
import classes from './styles.module.scss';

export default function Community({ title, click, image, variant }) {
  const imagePath = image.replace(/\\/g, '/');
  return (
    <div
      className={
        variant === 'mobile'
          ? classnames(classes.Community, classes.mobile)
          : classes.Community
      }
      onClick={click}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${STATIC_URL}${imagePath})`,
        }}
      />
      <div className={classes.heading}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
