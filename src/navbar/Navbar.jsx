import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import mindLogo from '../assets/logos/mindLogo.png'
import { MenuToggle } from "./MenuToggle";
import './Navbar.css';

const DeviceSize = {
  mobile: 850,
  tablet: 992,
  laptop: 1324,
  desktop: 2024,
};

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  
  position: fixed;
  top: 65px;
  left: 0;
`;

const Marginer = styled.div`
  height: 2em;
  position: absolute;
`;

export default function Navbar(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);

  // Function to determine which nav item should be active based on current route
  const getActiveItem = () => {
    switch(location.pathname) {
      case '/':
      case '/PurdueMIND/':
        return 'Home';
      case '/AboutUs':
        return 'About Us';
      case '/Projects':
        return 'Projects';
      case '/Onboarding':
        return 'Onboarding';
      default:
        return 'Home';
    }
  };

  const active = getActiveItem();

  return (
    <div className='navbarContainer'>
      <div className='section'>
        <Link to='/'>
          <button className='btn' id='mindLogoBtn'>
            <img
              id='mindLogo' src={mindLogo} alt='MIND Logo'
            />
          </button>
        </Link>
      </div>

      <div className='section' id='middle'>
        {!isMobile &&
          <div className='navbar'>
            <div id='navPaths'>
              <Link to='/'>
                <button
                  className={`btn navBtn ${active === 'Home' ? 'activeBtn' : ''}`}
                >Home</button>
              </Link>

              <Link to='/AboutUs'>
                <button
                  className={`btn navBtn ${active === 'About Us' ? 'activeBtn' : ''}`}
                >About Us</button>
              </Link>

              <Link to='/Projects'>
                <button
                  className={`btn navBtn ${active === 'Projects' ? 'activeBtn' : ''}`}
                >Projects</button>
              </Link>

              <Link to='/Onboarding'>
                <button
                  className={`btn navBtn ${active === 'Onboarding' ? 'activeBtn' : ''}`}
                >Onboarding</button>
              </Link>
            </div>
          </div>
        }
      </div>

      <div className='section'>
        {isMobile &&
          <NavLinksContainer>
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />

            {isOpen &&
              <LinksWrapper>
                <div id='hamburger'>
                  <Link to='/'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >Home</button>
                  </Link>

                  <Link to='/AboutUs'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >About Us</button>
                  </Link>

                  <Link to='/Projects'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >Projects</button>
                  </Link>

                  <Link to='/Onboarding'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >Onboarding</button>
                  </Link>

                  <Marginer />
                </div>
              </LinksWrapper>
            }
          </NavLinksContainer>
        }
      </div>
    </div >
  );
}

