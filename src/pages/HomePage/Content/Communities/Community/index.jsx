import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { STATIC_URL } from '../../../../../constants/main';
import classes from './styles.module.scss';

export default function Community({ title, image, variant, id }) {
  const imagePath = image.replace(/\\/g, '/');
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: `/community/${id}`,
        state: { from: location.pathname },
      }}
      className={
        variant === 'mobile'
          ? classnames(classes.Community, classes.mobile)
          : classes.Community
      }
      // onClick={click}
      preserveNeighborhoodSelection="true"
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
    </Link>
  );
}
