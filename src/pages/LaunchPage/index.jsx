import React, { useState } from 'react';

import classnames from 'classnames';

import classes from './styles.module.scss';
import EmailForm from '../../components/EmailForm';
import mobileMap from '../../assets/images/map_mobile-svg.svg';

export default function LaunchPage() {
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
  const [arrowIconClasses, setArrowIconClasses] = useState(classes.arrowIcon);
  const [mapScrollPosition, setMapScrollPosition] = useState(0);

  const toggleEmailFormVisibility = () => {
    setMapScrollPosition(window.scrollY);

    setArrowIconClasses((prevState) => {
      if (prevState === classes.arrowIcon) {
        return classnames(classes.arrowIcon, classes.clicked);
      }
      return classes.arrowIcon;
    });
    setIsEmailFormVisible((prevState) => !prevState);
    setTimeout(() => {
      window.scrollTo(0, mapScrollPosition);
    }, 0);
  };

  return (
    <div
      className={
        isEmailFormVisible
          ? classnames(classes.LaunchPage, classes.formIsOpen)
          : classes.LaunchPage
      }
    >
      <img
        src={mobileMap}
        alt="map"
        className={classes.mobileMap}
        style={{ top: -mapScrollPosition }}
      />
      <div className={classes.overlay} />
      <div className={classes.background} />

      <div className={classes.content}>
        <div className={classes.heading}>
          <div className={classes.line} />
          <h1>
            <span className={classes.capitalLetter}>T</span>HE{' '}
            <span className={classes.capitalLetter}>L</span>OCALIST
          </h1>
          <div className={classes.line} />
        </div>
        <div
          className={classes.releaseDate}
          onClick={toggleEmailFormVisibility}
        >
          <span>Coming February 2021</span>
          <i role="button" className={arrowIconClasses} tabIndex={0}>
            Email form
          </i>
        </div>
        <EmailForm show={isEmailFormVisible} />
      </div>
    </div>
  );
}
