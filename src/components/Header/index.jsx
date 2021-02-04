import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './styles.module.scss';
import Search from '../Search';

function Header({ location, setIsSideMenuVisible }) {
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);

  const showSideMenu = () => {
    setIsSideMenuVisible(true);
  };

  const showSearchbar = () => {
    setIsSearchbarVisible(true);
  };

  if (location.pathname === '/') {
    return <></>;
  }

  return (
    <header className={classes.Header}>
      <i
        role="button"
        className={classes.burgerMenu}
        onClick={showSideMenu}
        tabIndex={0}
        style={{ visibility: isSearchbarVisible ? 'hidden' : 'visible' }}
      >
        Menu
      </i>
      <h1 className={classes.abyrwalg}>
        <span className={classes.capitalLetter}>T</span>HE{' '}
        <span className={classes.capitalLetter}>L</span>OCALIST
      </h1>
      <i
        role="button"
        className={classes.search}
        onClick={showSearchbar}
        tabIndex={0}
        style={{ visibility: isSearchbarVisible ? 'hidden' : 'visible' }}
      >
        Menu
      </i>
      {isSearchbarVisible && (
        <Search setIsSearchbarVisible={setIsSearchbarVisible} />
      )}
    </header>
  );
}

export default withRouter(Header);
