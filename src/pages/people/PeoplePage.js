import './PeoplePage.css';
import '../../App.css';

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';
import LeadProfile from './components/Lead';

import aaron from '../../assets/headshots/aaron.jpeg';
import defaultHeadshot from '../../assets/headshots/default.png';
import grant from '../../assets/headshots/grant.jpeg';
import ian from '../../assets/headshots/ian.jpeg';
import isha from '../../assets/headshots/isha.jpeg';
import khushi from '../../assets/headshots/khushi.jpeg';
import luke from '../../assets/headshots/luke.jpeg';
import myra from '../../assets/headshots/myra.jpeg';
import scout from '../../assets/headshots/scout.jpeg';
import shreyak from '../../assets/headshots/shreyak.jpeg';
import shreyap from '../../assets/headshots/shreyap.jpeg';
import supreet from '../../assets/headshots/supreet.jpeg';
import uday from '../../assets/headshots/uday.jpeg';

const leaderList = require('./leaderList.json');

// Static map of headshot filename (as referenced in leaderList.json) to its imported asset
const images = {
  'aaron.jpeg': aaron,
  'default.png': defaultHeadshot,
  'grant.jpeg': grant,
  'ian.jpeg': ian,
  'isha.jpeg': isha,
  'khushi.jpeg': khushi,
  'luke.jpeg': luke,
  'myra.jpeg': myra,
  'scout.jpeg': scout,
  'shreyak.jpeg': shreyak,
  'shreyap.jpeg': shreyap,
  'supreet.jpeg': supreet,
  'uday.jpeg': uday,
};

// Function to get image source with fallback
function getImageSrc(imageName) {
  return images[imageName] || images['default.png'];
}

function getImageForMember(memberId) {
  const member = leaderList.officers.find(m => m.id === memberId) || leaderList.advisors.find(m => m.id === memberId) || leaderList.leads.find(m => m.id === memberId);
  return member ? getImageSrc(member.headshot) : getImageSrc('default.png');
}

export default function PeoplePage() {
  return (
    <div className='peoplePage'>

      <div className='peopleTitleDiv'>
        <div className='peopleTitleLeftDiv'>
          <h1 id='peopleTitle'>Executive Board</h1>
        </div>
        <div className='peopleTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='officers'>
        {getProfile(leaderList.officers, 'Officers')}
      </div>

      <div className='break'/>

      <div className='peopleTitleDiv' id='peopleMiddleDiv'>
        <div className='peopleTitleLeftDiv'>
          <h1 id='peopleTitle'>Team Leads</h1>
        </div>
        <div className='peopleTitleRightDiv'/>
      </div>

      <div className='memberProfiles' id='teamLeads'>
        {getProfile(leaderList.leads, 'Team Leads')}
      </div>

      <div className='break'/>

      <div className='peopleTitleDiv' id='peopleBottomDiv'>
        <div className='peopleTitleLeftDiv'>
          <h1 id='peopleTitle'>Faculty Advisor</h1>
        </div>
        <div className='peopleTitleRightDiv'/>
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
