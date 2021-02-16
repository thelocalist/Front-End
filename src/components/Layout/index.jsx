import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Context } from '../../context';
import Header from '../Header';
import SideMenu from '../SideMenu';

const Layout = ({ location, children }) => {
  const [currentNeighborhood, setCurrentNeighborhood] = useState('');
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const isLaunchPage = location.pathname === '/';

  return (
    <Context.Provider value={[currentNeighborhood, setCurrentNeighborhood]}>
      {!isLaunchPage && <Header setIsSideMenuVisible={setIsSideMenuVisible} />}
      <SideMenu
        isSideMenuVisible={isSideMenuVisible}
        setIsSideMenuVisible={setIsSideMenuVisible}
      />
      {children}
    </Context.Provider>
  );
};
export default withRouter(Layout);
