import { React, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../Header';
import SideMenu from '../SideMenu';

const Layout = ({ location, children }) => {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const isLaunchPage = location.pathname === '/';

  return (
    <>
      {!isLaunchPage && <Header setIsSideMenuVisible={setIsSideMenuVisible} />}
      <SideMenu
        isSideMenuVisible={isSideMenuVisible}
        setIsSideMenuVisible={setIsSideMenuVisible}
      />
      {children}
    </>
  );
};
export default withRouter(Layout);
