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
    if (location.pathname.startsWith('/People')) return 'People';
    if (location.pathname.startsWith('/Projects')) return 'Projects';
    if (location.pathname.startsWith('/Onboarding')) return 'Onboarding';
    if (location.pathname.startsWith('/Contact')) return 'Contact';
    return 'Home';
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
            <div className='navDropdown'>
              <Link to='/'>
                <button
                  className={`btn navBtn ${active === 'Home' ? 'activeBtn' : ''}`}
                ><b>Home</b></button>
              </Link>
              <div className='dropdownMenu dropdownMenuRight'>
                <Link className='dropdownItem' to={{ pathname: '/', hash: '#calendarBreak' }}>Calendar</Link>
              </div>
            </div>

            <div className='navDropdown'>
              <Link to='/People'>
                <button
                  className={`btn navBtn ${active === 'People' ? 'activeBtn' : ''}`}
                ><b>People</b></button>
              </Link>
              <div className='dropdownMenu'>
                <Link className='dropdownItem' to={{ pathname: '/People', hash: '#officersBreak' }}>Executive Board</Link>
                <Link className='dropdownItem' to={{ pathname: '/People', hash: '#peopleMiddleDiv' }}>Team Leads</Link>
                <Link className='dropdownItem' to={{ pathname: '/People', hash: '#peopleBottomDiv' }}>Advisors</Link>
              </div>
            </div>

            <div className='navDropdown'>
              <Link to='/Projects'>
                <button
                  className={`btn navBtn ${active === 'Projects' ? 'activeBtn' : ''}`}
                ><b>Projects</b></button>
              </Link>
              <div className='dropdownMenu'>
                <Link className='dropdownItem' to='/Projects/DVT'>DVT</Link>
                <Link className='dropdownItem' to='/Projects/CTS'>CTS</Link>
                <Link className='dropdownItem' to='/Projects/TremorGlove'>Tremor Glove</Link>
                <Link className='dropdownItem' to='/Projects/MEND'>MEND</Link>
              </div>
            </div>
          
            <div className='navDropdown'>
              <Link to='/Learning'>
                <button
                  className={`btn navBtn ${active === 'Learning' ? 'activeBtn' : ''}`}
                ><b>Learning</b></button>
              </Link>
              <div className='dropdownMenu'>
                <Link className='dropdownItem' to={{ pathname: '/Learning', hash: '#onboardingBreak' }}>Onboarding</Link>
                <Link className='dropdownItem' to={{ pathname: '/Learning', hash: '#workshopsBreak' }}>Workshops</Link>
              </div>
            </div>

            <Link to='/Contact'>
              <button
                className={`btn navBtn ${active === 'Contact' ? 'activeBtn' : ''}`}
              ><b>Contact</b></button>
            </Link>

            <a href='https://www.coolfaces.net/TooCOOLPUWL/vECItemCatalogOrganizationItems/OrganizationItemsGallery.aspx?Organization=BHSiXXqQ0BU%3d' target='_blank' rel='noopener noreferrer'>
              <button
                className={`btn navBtn ${active === 'Donate' ? 'activeBtn': ''}`}
                id={`donateBtn`}
                ><b>Storefront</b></button>
            </a>
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
                  <div className='burgerSubLinks'>
                    <Link to={{ pathname: '/', hash: '#calendarBreak' }} onClick={() => setOpen(!isOpen)}>Calendar</Link>
                  </div>

                  <Link to='/People'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >People</button>
                  </Link>
                  <div className='burgerSubLinks'>
                    <Link to={{ pathname: '/People', hash: '#officersBreak' }} onClick={() => setOpen(!isOpen)}>Executive Board</Link>
                    <Link to={{ pathname: '/People', hash: '#teamLeadsBreak' }} onClick={() => setOpen(!isOpen)}>Team Leads</Link>
                    <Link to={{ pathname: '/People', hash: '#advisorsBreak' }} onClick={() => setOpen(!isOpen)}>Advisors</Link>
                  </div>

                  <Link to='/Projects'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >Projects</button>
                  </Link>
                  <div className='burgerSubLinks'>
                    <Link to='/Projects/DVT' onClick={() => setOpen(!isOpen)}>DVT</Link>
                    <Link to='/Projects/CTS' onClick={() => setOpen(!isOpen)}>CTS</Link>
                    <Link to='/Projects/TremorGlove' onClick={() => setOpen(!isOpen)}>Tremor Glove</Link>
                    <Link to='/Projects/Alyssa' onClick={() => setOpen(!isOpen)}>Alyssa</Link>
                  </div>

                  <Link to='/Onboarding'>
                    <button
                      className='btn burgerBtn'
                      onClick={() => setOpen(!isOpen)}
                    >Onboarding</button>
                  </Link>

                  <Link to='/Contact'>
                    <button
                      className='btn burgerBtn'
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

