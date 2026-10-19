import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import mindLogo from '../assets/logos/mindLogo.png'
import { MenuToggle } from './MenuToggle';
import NAV_ITEMS, { STOREFRONT_URL } from './navItems';
import './Navbar.css';

const MOBILE_MAX_WIDTH = 900;

// Home is active for any path not claimed by another section
function getActiveLabel(pathname) {
  const match = NAV_ITEMS.find((item) => item.to !== '/' && pathname.startsWith(item.to));
  return match ? match.label : 'Home';
}

export default function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Hide the navbar when scrolling down, reveal it when scrolling up or at the top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY.current) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [location]);

  const active = getActiveLabel(location.pathname);

  return (
    <nav className={`navbarContainer ${hidden && !isOpen ? 'navbarHidden' : ''}`}>
      <Link to='/' className='navLogo' aria-label='Purdue MIND home'>
        <img id='mindLogo' src={mindLogo} alt='MIND Logo' />
      </Link>

      {!isMobile &&
        <div className='navLinks'>
          {NAV_ITEMS.map((item) => (
            <div className='navItem' key={item.label}>
              <Link
                to={item.to}
                className={`navLink ${active === item.label ? 'navLinkActive' : ''}`}
              >{item.label}</Link>

              {item.children &&
                <div className='dropdownMenu'>
                  {item.children.map((child) => (
                    <Link className='dropdownItem' key={child.label} to={child.to}>{child.label}</Link>
                  ))}
                </div>
              }
            </div>
          ))}

          <a className='storefrontBtn' href={STOREFRONT_URL} target='_blank' rel='noopener noreferrer'>
            Storefront
          </a>
        </div>
      }

      {isMobile &&
        <div className='mobileToggle'>
          <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
        </div>
      }

      {isMobile && isOpen &&
        <div className='mobileMenu'>
          {NAV_ITEMS.map((item) => (
            <div className='mobileGroup' key={item.label}>
              <Link
                to={item.to}
                className={`mobileLink ${active === item.label ? 'navLinkActive' : ''}`}
                onClick={() => setOpen(false)}
              >{item.label}</Link>
              {item.children && item.children.map((child) => (
                <Link
                  className='mobileSubLink'
                  key={child.label}
                  to={child.to}
                  onClick={() => setOpen(false)}
                >{child.label}</Link>
              ))}
            </div>
          ))}
          <a className='storefrontBtn mobileStorefront' href={STOREFRONT_URL} target='_blank' rel='noopener noreferrer'>
            Storefront
          </a>
        </div>
      }
    </nav>
  );
}
