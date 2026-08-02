import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './PeoplePage.css';
import '../../App.css';

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';
import LeadProfile from './components/Lead';

import aaron from '../../assets/headshots/aaron.jpeg';
import defaultHeadshot from '../../assets/headshots/default.png';

import uday from '../../assets/headshots/uday.jpg';
import scout from '../../assets/headshots/scout.jpeg';
import shivum from '../../assets/headshots/shivum.jpg';
import ghosh from '../../assets/headshots/ghosh.jpeg';
import anaya from '../../assets/headshots/anaya.png';
import tashi from '../../assets/headshots/tashi.png';
import varun from '../../assets/headshots/varun.png';

import ian from '../../assets/headshots/ian.jpeg';
import isha from '../../assets/headshots/isha.jpeg';
import khushi from '../../assets/headshots/khushi.jpeg';
import shreyap from '../../assets/headshots/shreyap.jpeg';

const leaderList = require('./leaderList.json');

// Static map of headshot filename (as referenced in leaderList.json) to its imported asset
const images = {
  'aaron.jpeg': aaron,
  'default.png': defaultHeadshot,
  'uday.jpg': uday,
  'scout.jpeg': scout,
  'shivum.jpg': shivum,
  'ghosh.jpeg': ghosh,
  'anaya.png': anaya,
  'tashi.png': tashi,
  'varun.png': varun,
  'ian.jpeg': ian,
  'isha.jpeg': isha,
  'khushi.jpeg': khushi,
  'shreyap.jpeg': shreyap,
};

// Function to get image source with fallback
function getImageSrc(imageName) {
  return images[imageName] || images['default.png'];
}

function getImageForMember(memberId) {
  const member = leaderList.officers.find(m => m.id === memberId) || leaderList.advisors.find(m => m.id === memberId) || leaderList.leads.find(m => m.id === memberId);
  return member ? getImageSrc(member.headshot) : getImageSrc('default.png');
}

const NAVBAR_HEIGHT = 90;

export default function PeoplePage() {
  const location = useLocation();

  // Scroll to the section named in the URL hash (e.g. #teamLeads), or
  // to the top of the page when navigating here with no hash.
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className='peoplePage'>

      <div className='majorTitleDiv'>
        <h1 className='majorTitle' id='majorPeopleTitle'>Our People</h1>
      </div>

      <div className='peoplePitchDiv'>
        <h3 id='peoplePitch'>
          Clearing roadblocks to foster MedTech innovation
        </h3>
      </div>

      <div className='break'/>

      <div className='sectionTitleDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 id='peopleTitle'>Executive Board</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='officers'>
        {getProfile(leaderList.officers, 'Officers')}
      </div>

      <div className='break' id='teamLeadsBreak'/>

      <div className='sectionTitleDiv' id='peopleMiddleDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 id='peopleTitle'>Team Leads</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='teamLeads'>
        {getProfile(leaderList.leads, 'Team Leads')}
      </div>

      <div className='break' id='advisorsBreak'/>

      <div className='sectionTitleDiv' id='peopleBottomDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 id='peopleTitle'>Faculty Advisor</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='advisors'>
        {getProfile(leaderList.advisors, 'Advisors')}
      </div>

    </div>
  );
};

function getProfile(memberList, type) {
  const formattedProfiles = [];
  for (const index in memberList) {
    const member = memberList[index];
    if (type === 'Officers') {
      formattedProfiles.push(<OfficerProfile
        id={member.id}
        imgSrc={getImageForMember(member.id)}
        name={member.name}
        position={member.position}
        major={member.major}
        email={member.email}
        linkedIn={member.linkedIn} />)
    }
    else if (type === 'Team Leads') {
      formattedProfiles.push(<LeadProfile
        id={member.id}
        imgSrc={getImageForMember(member.id)}
        name={member.name}
        team={member.team}
        major={member.major}
        email={member.email}
        linkedIn={member.linkedIn} />)
    } else {
      formattedProfiles.push(<AdvisorProfile
        id={member.id}
        imgSrc={getImageForMember(member.id)}
        name={member.name}
        position={member.position}
        email={member.email}/>)
    }
  }
  return formattedProfiles;
}
