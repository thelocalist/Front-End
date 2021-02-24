import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Context } from '../../context';
import { SearchContext } from '../../context/searchContext';
import Header from '../Header';
import SideMenu from '../SideMenu';

const Layout = ({ location, children }) => {
  const [currentNeighborhood, setCurrentNeighborhood] = useState('');
  const [isMobileStoryOpened, setIsMobileStoryOpened] = useState(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  console.log('LAYOUT HAS RENDERED');

  const [
    isSearchByNeighborhoodActive,
    setIsSearchByNeighborhoodActive,
  ] = useState(false);

  const isLaunchPage = location.pathname === '/';

  useEffect(() => {
    console.log(
      'FROM LAYOUT: isSearchByNeighborhoodActive = ',
      isSearchByNeighborhoodActive
    );
  }, [isSearchByNeighborhoodActive]);

  return (
    <Context.Provider
      value={[
        currentNeighborhood,
        setCurrentNeighborhood,
        isMobileStoryOpened,
        setIsMobileStoryOpened,
      ]}
    >
      <SearchContext.Provider
        value={[isSearchByNeighborhoodActive, setIsSearchByNeighborhoodActive]}
      >
        {!isLaunchPage && (
          <Header setIsSideMenuVisible={setIsSideMenuVisible} />
        )}
        <SideMenu
          isSideMenuVisible={isSideMenuVisible}
          setIsSideMenuVisible={setIsSideMenuVisible}
        />
        {children}
      </SearchContext.Provider>
    </Context.Provider>
  );
};
export default withRouter(Layout);
