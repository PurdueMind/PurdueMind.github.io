import React, { useEffect, useRef, useState } from 'react';
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
  margin-left: auto;
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
  top: 95px;
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

  // Function to determine which nav item should be active based on current route
  const getActiveItem = () => {
    switch(location.pathname) {
      case '/':
      case '/PurdueMIND/':
        return 'Home';
      case '/People':
        return 'People';
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
    <div className={`navbarContainer ${hidden ? 'navbarHidden' : ''}`}>
      <div className='section'>
        <Link to='/'>
          <button className='btn' id='mindLogoBtn'>
            <img
              id='mindLogo' src={mindLogo} alt='MIND Logo'
            />
          </button>
        </Link>
      </div>

      <div className='section' id='navSection'>
        {!isMobile &&
          <div className='navbar'>
            <Link to='/'>
              <button
                className={`btn navBtn ${active === 'Home' ? 'activeBtn' : ''}`}
              ><b>Home</b></button>
            </Link>

            <Link to='/People'>
              <button
                className={`btn navBtn ${active === 'People' ? 'activeBtn' : ''}`}
              ><b>People</b></button>
            </Link>

            <Link to='/Projects'>
              <button
                className={`btn navBtn ${active === 'Projects' ? 'activeBtn' : ''}`}
              ><b>Projects</b></button>
            </Link>

            <Link to='/Onboarding'>
              <button
                className={`btn navBtn ${active === 'Onboarding' ? 'activeBtn' : ''}`}
              ><b>Onboarding</b></button>
            </Link>

            <Link to='/Donate'>
              <button
                className={`btn navBtn ${active === 'Donate' ? 'activeBtn': ''}`}
                id={`donateBtn`}
                ><b>Sponsor</b></button>
            </Link>
          </div>
        }

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

                  <Link to='/People'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >People</button>
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

