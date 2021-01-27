import { React, useState } from 'react';

import Header from '../Header';
import SideMenu from '../SideMenu';

export default function Layout({ children }) {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  return (
    <>
      <Header setIsSideMenuVisible={setIsSideMenuVisible} />
      <SideMenu
        isSideMenuVisible={isSideMenuVisible}
        setIsSideMenuVisible={setIsSideMenuVisible}
      />
      {children}
    </>
  );
}
