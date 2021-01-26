import { React, useRef, useEffect } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import classes from './SideMenu.module.css';

export default function SideMenu({ showSideMenu, setShowSideMenu }) {
  const areas = [
    'Astoria',
    'Bronx',
    'Chelsea',
    'Dumbo & Downtown',
    'FIDI',
    'Flatiron',
    'Greenpoint & Williamsburg',
    'Greenwich Village',
    'Harlem',
    'Jersey City & Hoboken',
    'Long Island City',
    'Lower East Side',
    'Midtown',
    'Roosevelt Island',
    'Soho & Tribeca',
    'Upper East Side',
    'Upper West Side',
    'Washington Heights',
    'West New York',
  ];

  const menuItems = [
    'To Publish, Contact or Sign Up for the Newsletter, Email: Operations@thelocalist.co',
    'Account (Coming Soon)',
    'Newsletter',
    'About',
    'Privacy Policy',
  ];

  const menuRef = useRef();

  const hideSideMenuHandler = () => {
    setShowSideMenu(false);
  };

  const outsideMenuClickHandler = (event) => {
    if (!menuRef.current.contains(event.target)) {
      hideSideMenuHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', outsideMenuClickHandler);
    return () => {
      document.removeEventListener('mousedown', outsideMenuClickHandler);
    };
  }, []);

  return (
    <div
      className={`${classes.SideMenu} ${
        showSideMenu ? classes.show : classes.hide
      }`}
      ref={menuRef}
    >
      <div className={`${classes.col} ${classes.menu}`}>
        <header>
          <i
            role="button"
            className={classes.closeButton}
            onClick={hideSideMenuHandler}
            tabIndex={0}
          >
            Close
          </i>
          <h2>Menu</h2>
        </header>
        <div>
          <ul className={classes.areasList}>
            <BrowserRouter>
              {menuItems.map((menuItem) => (
                <li className={classes.areaLi}>
                  <Link to="/" className={classes.areaLink}>
                    {menuItem}
                  </Link>
                </li>
              ))}
            </BrowserRouter>
          </ul>
        </div>
      </div>
      <div className={classes.col}>
        <header>
          <h2>Directory</h2>
        </header>
        <div className={classes.areaListContainer}>
          <ul className={classes.areasList}>
            <BrowserRouter>
              {areas.map((area) => (
                <li className={classes.areaLi}>
                  <Link to="/" className={classes.areaLink}>
                    {area}
                  </Link>
                </li>
              ))}
            </BrowserRouter>
          </ul>
        </div>
      </div>
    </div>
  );
}
