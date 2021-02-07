import { React, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import classes from './styles.module.scss';
import EmailForm from '../EmailForm';
import { AREAS } from '../../constants/main';

export default function SideMenu({ isSideMenuVisible, setIsSideMenuVisible }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isSubscriptionFormVisible, setIsSubscriptionFormVisible] = useState(
    'false'
  );

  const menuRef = useRef();

  const toggleSubmenuVisibility = () => {
    setIsSubmenuVisible((prevState) => !prevState);
    /* setArrowIconClasses((prevState) => {
      if (prevState === classes.arrowIcon) {
        return `${classes.arrowIcon} ${classes.clicked}`;
      }
      return classes.arrowIcon;
    }); */
  };

  const hideSideMenu = () => {
    setIsSideMenuVisible(false);
    setIsSubmenuVisible(false);
    setIsSubscriptionFormVisible(false);
  };

  const hideSideMenuOnOutsideClick = (event) => {
    if (!menuRef.current.contains(event.target)) {
      hideSideMenu();
    }
  };

  const hideSideMenuOnClick = (event) => {
    if (event.target.tagName === 'A') {
      hideSideMenu();
    }
  };

  const toggleSubscriptionFormVisibility = () => {
    setIsSubscriptionFormVisible((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener('mousedown', hideSideMenuOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', hideSideMenuOnOutsideClick);
    };
  }, []);

  const sideMenuClasses = `${classes.SideMenu} ${
    isSideMenuVisible ? classes.show : classes.hide
  } $`;

  return (
    <div
      className={sideMenuClasses}
      ref={menuRef}
      onClick={hideSideMenuOnClick}
    >
      <div className={`${classes.col} ${classes.menu}`}>
        <header>
          <i
            role="button"
            className={classes.closeButton}
            onClick={hideSideMenu}
            tabIndex={0}
          >
            Close
          </i>
          <h2>MENU</h2>
        </header>
        <div>
          <ul className={classes.areasList}>
            <li className={classes.areaLi}>
              <span
                className={classes.submenuButton}
                onClick={toggleSubmenuVisibility}
              >
                <span className={classes.areaLink}>Directory</span>
                <i
                  role="button"
                  className={classnames(
                    classes.arrowIcon,
                    isSubmenuVisible && classes.clicked
                  )}
                  tabIndex={0}
                >
                  Directory
                </i>
              </span>
              <li style={{ display: isSubmenuVisible ? 'block' : 'none' }}>
                <div className={classes.areaListContainer}>
                  <ul className={classes.areasList}>
                    {AREAS.map((area) => (
                      <li className={classes.areaLi} key={area}>
                        <Link to="/" className={classes.areaLink}>
                          {area}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </li>
            <li
              className={`${classes.areaLi} ${
                isSubscriptionFormVisible ? classes.expand : null
              }`}
            >
              <span
                className={classes.areaLink}
                onClick={toggleSubscriptionFormVisibility}
              >
                Newsletter
              </span>
              <EmailForm show={isSubscriptionFormVisible} small />
            </li>
            <li className={classes.areaLi}>
              <Link to="/" className={classes.areaLink}>
                Account (Coming Soon)
              </Link>
            </li>
            <li className={classes.areaLi}>
              <Link to="/" className={classes.areaLink}>
                Privacy Policy
              </Link>
            </li>
            <li className={classes.areaLi}>
              <Link to="/" className={classes.areaLink}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <footer className={classes.menuFooter}>
        <p>Publish - Contact - Newsletter</p>
        <p>Operations@thelocalist.co</p>
      </footer>
    </div>
  );
}
