import React from 'react';

import classes from './styles.module.scss';

export default function Community({ title, click, image }) {
  const imagePath = image.replace(/\\/g, '/');
  return (
    <div className={classes.Community} onClick={click}>
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
