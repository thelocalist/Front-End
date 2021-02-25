import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';

import { useLocation } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import { Context } from '../../context/index';
import Search from '../Search';
import MobileSearch from '../MobileSearch';
import classes from './styles.module.scss';

function Header({ setIsSideMenuVisible }) {
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [isMobileSearchBarVisible, setIsMobileSearchBarVisible] = useState(
    false
  );

  const [, , isMobileStoryOpened] = useContext(Context);

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const showSideMenu = () => {
    setIsSideMenuVisible(true);
  };

  const showSearchbar = () => {
    setIsSearchbarVisible(true);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home/search') {
      showSearchbar();
    }
  }, []);

  useEffect(() => {
    if (!isSearchbarVisible) {
      setTimeout(() => {
        setIsMobileSearchBarVisible(false);
      }, 500);
    } else {
      setIsMobileSearchBarVisible(true);
    }
  }, [isSearchbarVisible]);

  useEffect(() => {
    if (location.pathname === '/home/search' && isMobile) {
      setTimeout(() => {
        setIsMobileSearchBarVisible(true);
      }, 500);
    }
  }, []);

  return (
    <header
      className={
        isMobile && isMobileSearchBarVisible && !isMobileStoryOpened
          ? classnames(classes.Header, classes.mobileSearchIsOpen)
          : classes.Header
      }
    >
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
      <MediaQuery maxWidth={1024}>
        <MobileSearch
          isSearchbarVisible={isSearchbarVisible}
          setIsSearchbarVisible={setIsSearchbarVisible}
        />
      </MediaQuery>
      {isSearchbarVisible && (
        <>
          <MediaQuery minWidth={1025}>
            <Search setIsSearchbarVisible={setIsSearchbarVisible} />
          </MediaQuery>
        </>
      )}
    </header>
  );
}

export default Header;
