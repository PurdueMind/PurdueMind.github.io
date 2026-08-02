import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './PeoplePage.css';
import '../../App.css';

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';
import LeadProfile from './components/Lead';

import defaultHeadshot from '../../assets/people/default.png';

const leaderList = require('./leaderList.json');

// Each role's photos live in their own folder; require.context loads them all
// so new headshots just need to be dropped in without touching this file.
const execContext = require.context('../../assets/people/exec', false, /\.(png|jpe?g)$/);
const leadContext = require.context('../../assets/people/leads', false, /\.(png|jpe?g)$/);
const advisorContext = require.context('../../assets/people/advisors', false, /\.(png|jpe?g)$/);

function buildImageMap(context) {
  const images = {};
  context.keys().forEach((key) => {
    const filename = key.replace('./', '');
    const mod = context(key);
    images[filename] = mod && mod.default ? mod.default : mod;
  });
  return images;
}

const imagesByType = {
  Officers: buildImageMap(execContext),
  'Team Leads': buildImageMap(leadContext),
  Advisors: buildImageMap(advisorContext),
};

function getImageSrc(type, filename) {
  return (imagesByType[type] && imagesByType[type][filename]) || defaultHeadshot;
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
          INSERT IMAGES OF EXEC AND LEADS HERE
        </h3>
      </div>

      <div className='break'/>

      <div className='sectionTitleDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 className='sectionTitle'>Executive Board</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='officers'>
        {getProfile(leaderList.officers, 'Officers')}
      </div>

      <div className='break' id='teamLeadsBreak'/>

      <div className='sectionTitleDiv' id='peopleMiddleDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 className='sectionTitle'>Team Leads</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='teamLeads'>
        {getProfile(leaderList.leads, 'Team Leads')}
      </div>

      <div className='break' id='advisorsBreak'/>

      <div className='sectionTitleDiv' id='peopleBottomDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 className='sectionTitle'>Advisors</h1>
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
        imgSrc={getImageSrc(type, member.filename)}
        name={member.name}
        position={member.position}
        major={member.major}
        email={member.email}
        linkedIn={member.linkedIn} />)
    }
    else if (type === 'Team Leads') {
      formattedProfiles.push(<LeadProfile
        id={member.id}
        imgSrc={getImageSrc(type, member.filename)}
        name={member.name}
        team={member.team}
        major={member.major}
        email={member.email}
        linkedIn={member.linkedIn} />)
    } else {
      formattedProfiles.push(<AdvisorProfile
        id={member.id}
        imgSrc={getImageSrc(type, member.filename)}
        name={member.name}
        position={member.position}
        email={member.email}/>)
    }
  }
  return formattedProfiles;
}
