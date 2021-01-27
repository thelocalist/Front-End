import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './styles.module.scss';

function Header({ location, setIsSideMenuVisible }) {
  const showSideMenuHandler = () => {
    setIsSideMenuVisible(true);
  };

  if (location.pathname === '/') {
    return <></>;
  }

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
      <i role="button" className={classes.search} tabIndex={0}>
        Menu
      </i>
    </header>
  );
}

export default withRouter(Header);
