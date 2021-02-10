import React from 'react';

import classnames from 'classnames';
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
          backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}${imagePath})`,
        }}
      />
      <div className={classes.heading}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
