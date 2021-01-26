import { React, useState } from 'react';

import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';

export default function Layout({ children }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <>
      <Header setShowSideMenu={setShowSideMenu} />
      <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      {children}
    </>
  );
}
