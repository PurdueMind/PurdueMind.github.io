import './Project.css';
import '../../App.css';
import LeadProfile from '../people/components/Lead';

import defaultHeadshot from '../../assets/headshots/default.png';
import ian from '../../assets/headshots/ian.jpeg';
import isha from '../../assets/headshots/isha.jpeg';
import khushi from '../../assets/headshots/khushi.jpeg';
import shreyap from '../../assets/headshots/shreyap.jpeg';

const leaderList = require('../people/leaderList.json');

const images = {
  'default.png': defaultHeadshot,
  'ian.jpeg': ian,
  'isha.jpeg': isha,
  'khushi.jpeg': khushi,
  'shreyap.jpeg': shreyap,
};

function getImageSrc(imageName) {
  return images[imageName] || images['default.png'];
}

function getImageForMember(memberId) {
  const member = leaderList.officers.find(m => m.id === memberId) || leaderList.advisors.find(m => m.id === memberId) || leaderList.leads.find(m => m.id === memberId);
  return member ? getImageSrc(member.headshot) : getImageSrc('default.png');
}

export default function Projects(
  {
    id,
    imgSrc,
    alt = '404: No Image',
    title,
    description,
    lead = '' // name of the team lead (optional)
  }) {
  description = expandDescription(description);
  return (
    <div className='project' id={id}>
      <div className='majorTitleDiv'>
        <h1 className='majorTitle' id='projectTitle'>{title}</h1>
      </div>
      <div className='projectInfoDiv'>
        <div className='projectImageDiv'>
          <img className='projectImage' src={imgSrc} alt={alt}/>
        </div>
        <div className='projectDescriptionDiv'>
          <p className='projectDescription'>{description}</p>
        </div>
      </div>

      <div className='break'/>

      <div className='sectionTitleDiv' id='projectBreak'>
        <div className='sectionTitleLeftDiv'>
          <h1 id='peopleTitle'>Project Leadership Team</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='projectLeadDiv'>
        {getProfile(leaderList, lead)}
      </div>

    </div>
  );
};

// function that takes a list of strings and return a unorder list of html elements
function expandDescription(description) {
  const listItems = [];
  for (const item of description) { listItems.push(<li>{item}</li>); }
  return (<ul>{listItems}</ul>);
}

function getProfile(memberList, name) {
  const allMembers = [...memberList.officers, ...memberList.leads, ...memberList.advisors];
  const member = allMembers.find(m => m.name === name);
  if (!member) return null;
  return <LeadProfile
    id={member.id}
    imgSrc={getImageForMember(member.id)}
    name={member.name}
    team={"Project Lead"}
    major={member.major}
    email={member.email}
    linkedIn={member.linkedIn} />
}