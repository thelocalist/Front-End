import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Neighborhood } from '../../context';
import classes from './styles.module.scss';
import EmailForm from '../EmailForm';
import { NEIGHBORHOODS } from '../../constants/main';
import useOnClickOutside from '../../helpers/useOnClickOutside';

export default function SideMenu({ isSideMenuVisible, setIsSideMenuVisible }) {
  const [, setCurrentNeighborhood] = useContext(Neighborhood);

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

  /*  const hideSideMenuOnOutsideClick = (event) => {
    if (!menuRef.current.contains(event.target)) {
      hideSideMenu();
    }
  }; */

  const hideSideMenuOnClick = (event) => {
    if (event.target.tagName === 'A') {
      hideSideMenu();
    }
  };

  const toggleSubscriptionFormVisibility = () => {
    setIsSubscriptionFormVisible((prevState) => !prevState);
  };

  /* useEffect(() => {
    document.addEventListener('mousedown', hideSideMenuOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', hideSideMenuOnOutsideClick);
    };
  }, []); */

  useOnClickOutside(menuRef, hideSideMenu);

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
          <ul className={classes.neighborhoodsList}>
            <li className={classes.neighborhoodLi}>
              <span
                className={classes.submenuButton}
                onClick={toggleSubmenuVisibility}
              >
                <span className={classes.neighborhoodLink}>Directory</span>
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
                <div className={classes.neighborhoodListContainer}>
                  <ul className={classes.neighborhoodsList}>
                    {NEIGHBORHOODS.map((neighborhood) => (
                      <li className={classes.neighborhoodLi} key={neighborhood}>
                        <span
                          className={classes.neighborhoodLink}
                          onClick={() => {
                            hideSideMenu();
                            setCurrentNeighborhood(neighborhood);
                          }}
                        >
                          {neighborhood}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </li>
            <li
              className={`${classes.neighborhoodLi} ${
                isSubscriptionFormVisible ? classes.expand : null
              }`}
            >
              <span
                className={classnames(
                  classes.neighborhoodLink,
                  classes.newsLetter
                )}
                onClick={toggleSubscriptionFormVisibility}
              >
                <span>Newsletter</span>
                <i
                  role="button"
                  className={classnames(
                    classes.arrowIcon,
                    isSubscriptionFormVisible && classes.clicked
                  )}
                  tabIndex={0}
                >
                  Directory
                </i>
              </span>
              <EmailForm show={isSubscriptionFormVisible} small />
            </li>
            <li className={classes.neighborhoodLi}>
              <Link to="/" className={classes.neighborhoodLink}>
                Account (Coming Soon)
              </Link>
            </li>
            {/* <li className={classes.neighborhoodLi}>
              <Link to="/" className={classes.neighborhoodLink}>
                Privacy Policy
              </Link>
            </li>
            <li className={classes.neighborhoodLi}>
              <Link to="/" className={classes.neighborhoodLink}>
                About
              </Link>
            </li> */}
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
