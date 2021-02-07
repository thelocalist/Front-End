import React, { useState } from 'react';
import classnames from 'classnames';

import classes from './styles.module.scss';
import Search from '../Search';

function Header({ setIsSideMenuVisible }) {
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);

  const showSideMenu = () => {
    setIsSideMenuVisible(true);
  };

  const showSearchbar = () => {
    setIsSearchbarVisible(true);
  };

  return (
    <header className={classes.Header}>
      <i
        role="button"
        className={classnames(
          classes.burgerMenu,
          isSearchbarVisible && classes.hidden
        )}
        onClick={showSideMenu}
        tabIndex={0}
      >
        Menu
      </i>
      <h1>
        <span className={classes.capitalLetter}>T</span>HE{' '}
        <span className={classes.capitalLetter}>L</span>OCALIST
      </h1>
      <i
        role="button"
        className={classnames(
          classes.search,
          isSearchbarVisible && classes.hidden
        )}
        onClick={showSearchbar}
        tabIndex={0}
      >
        Menu
      </i>
      {isSearchbarVisible && (
        <Search setIsSearchbarVisible={setIsSearchbarVisible} />
      )}
    </header>
  );
}

export default Header;
