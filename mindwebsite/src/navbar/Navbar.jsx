import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [active, setActive] = useState('Home');
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='navbarContainer'>
      <div className='section'>
        <Link to='/'>
          <button className='btn' id='mindLogoBtn'>
            <img
              id='mindLogo' src={mindLogo} alt='MIND Logo'
              onClick={() => setActive('Home')}
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
                  onClick={() => setActive('Home')}
                >Home</button>
              </Link>

              <Link to='/AboutUs'>
                <button
                  className={`btn navBtn ${active === 'About Us' ? 'activeBtn' : ''}`}
                  onClick={() => setActive('About Us')}
                >About Us</button>
              </Link>

              <Link to='/Projects'>
                <button
                  className={`btn navBtn ${active === 'Projects' ? 'activeBtn' : ''}`}
                  onClick={() => setActive('Projects')}
                >Projects</button>
              </Link>

              <Link to='/Alumni'>
                <button
                  className={`btn navBtn ${active === 'Alumni' ? 'activeBtn' : ''}`}
                  onClick={() => setActive('Alumni')}
                >Alumni</button>
              </Link>

              <Link to='/Contact'>
                <button
                  className={`btn navBtn ${active === 'Contact' ? 'activeBtn' : ''}`}
                  onClick={() => setActive('Contact')}
                >Contact</button>
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
                      onClick={() => setActive('Home')}
                      onClick={() => setOpen(!isOpen)}
                    >Home</button>
                  </Link>

                  <Link to='/AboutUs'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setActive('About Us')}
                      onClick={() => setOpen(!isOpen)}
                    >About Us</button>
                  </Link>

                  <Link to='/Projects'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setActive('Projects')}
                      onClick={() => setOpen(!isOpen)}
                    >Projects</button>
                  </Link>

                  <Link to='/Alumni'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setActive('Alumni')}
                      onClick={() => setOpen(!isOpen)}
                    >Alumni</button>
                  </Link>

                  <Link to='/Contact'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setActive('Contact')}
                      onClick={() => setOpen(!isOpen)}
                    >Contact</button>
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

