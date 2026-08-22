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

function getImageForMember(member) {
  return (member && leadImages[member.filename]) || defaultHeadshot;
}

export default function Projects(
  {
    imgSrc,
    alt = '404: No Image',
    title,
    description,
    projectCode = '' // matches a lead's teamCode in leaderList.json
  }) {
  description = expandDescription(description);
  return (
    <div className='project'>
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
        {getProfile(leaderList, projectCode)}
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

function getProfile(memberList, projectCode) {
  if (!projectCode) return [];

  const allLeads = [...memberList.leads, ...memberList.subleads];
  const projectLeads = allLeads.filter(m => m.teamCode === projectCode);

  return projectLeads.map(member => (
    <LeadProfile
      key={`${member.teamCode}-${member.name}`}
      id={`${member.teamCode}-${member.name}`}
      imgSrc={getImageForMember(member)}
      name={member.name}
      team={"Project Lead"}
      major={member.major}
      email={member.email}
      linkedIn={member.linkedIn} />
  ));
}