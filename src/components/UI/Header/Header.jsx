import React from 'react';

import classes from './Header.module.css';

export default function Header(props) {
  const showSideMenuHandler = () => {
    props.setShowSideMenu(true);
  };

  return (
    <header className={classes.Header}>
      <i
        role="button"
        className={classes.burgerMenu}
        onClick={showSideMenuHandler}
        tabIndex={0}
      >
        Menu
      </i>
      <h1>
        <span className={classes.capitalLetter}>T</span>HE{' '}
        <span className={classes.capitalLetter}>L</span>OCALIST
      </h1>
    </header>
  );
}
