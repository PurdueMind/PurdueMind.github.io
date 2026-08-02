import './Project.css';
import '../../App.css';
import LeadProfile from '../people/components/Lead';

import defaultHeadshot from '../../assets/people/default.png';

const leaderList = require('../people/leaderList.json');

// Team leads are the only role Project.js shows, so only that folder is needed here.
const leadContext = require.context('../../assets/people/leads', false, /\.(png|jpe?g)$/);

const leadImages = {};
leadContext.keys().forEach((key) => {
  const mod = leadContext(key);
  leadImages[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
});

function getImageForMember(memberId) {
  const member = leaderList.leads.find(m => m.id === memberId);
  return (member && leadImages[member.filename]) || defaultHeadshot;
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

      <div className='sectionTitleDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 className='sectionTitle'>Project Leadership Team</h1>
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