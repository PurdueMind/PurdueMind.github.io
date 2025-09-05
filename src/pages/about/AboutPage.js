import './AboutPage.css';
import '../../App.css';

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';
import LeadProfile from './components/Lead';

const leaderList = require('./leaderList.json');

// Function to dynamically import all images from the headshots folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item, _) => {
    images[item.replace('./', '')] = r(item).default;
  });
  return images;
}

// Import all images from the headshots directory
const images = importAll(
  require.context('../../assets/headshots', false, /\.(png|jpe?g)$/i)
);

// Function to get image source with fallback
function getImageSrc(imageName) {
  return images[imageName] || images['default.png'];
}

function getImageForMember(memberId) {
  const member = leaderList.officers.find(m => m.id === memberId) || leaderList.advisors.find(m => m.id === memberId) || leaderList.leads.find(m => m.id === memberId);
  return member ? getImageSrc(member.headshot) : getImageSrc('default.png');
}

export default function AboutPage() {
  return (
    <div className='aboutPage'>

      <div className='aboutInfo'>
        <div className='header'>
          <h1>About Us</h1>
        </div>

        <div>
          <p>{leaderList.introTxt.about}</p>
        </div>

        <ol>
          <li>{leaderList.introTxt.goal1}</li>
          <li>{leaderList.introTxt.goal2}</li>
          <li>To recognize the work done on the project through sub<a href="https://www.linkedin.com/in/megan-mcginnis-1b60142b2/" target='_blank' rel="noreferrer" className='hidden-link'>m</a>ission to national design competitions.</li>
        </ol>
      </div>

      <div className='break'/>

      <h2 className='subHeader'>MIND Officers</h2>
      <div className='memberProfiles' id='officers'>
        {getProfile(leaderList.officers, 'Officers')}
      </div>

      <div className='break'/>

      <h2 className='subHeader'>MIND Team Leads</h2>
      <div className='memberProfiles' id='teamLeads'>
        {getProfile(leaderList.leads, 'Team Leads')}
      </div>

      <div className='break'/>

      <h2 className='subHeader'>MIND Faculty Advisor</h2>
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
        position={member.position} />)
    }
  }
  return formattedProfiles;
}
