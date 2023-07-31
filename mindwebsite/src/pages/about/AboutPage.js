import './AboutPage.css';
import '../../App.css';

import pres from '../../assets/headshots/jenna.png'
import vice from '../../assets/headshots/kevin.png'
import treasurer from '../../assets/headshots/akio.png'
import secretary from '../../assets/headshots/kyle.png'
import eNi from '../../assets/headshots/elyssia.png'
import rNd from '../../assets/headshots/matthew.png'
import nNe from '../../assets/headshots/claire.png'

import damen from '../../assets/headshots/damen.png'

import lee from '../../assets/headshots/dr-lee.png'
import hoilett from '../../assets/headshots/dr-hoilett.png'

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';

const execList = require('./boardList.json');
const imgList = {
  "president": pres,
  "vice": vice,
  "treasurer": treasurer,
  "secretary": secretary,
  "eNi": eNi,
  "rNd": rNd,
  "nNe": nNe,
  "damen": damen,
  "lee": lee,
  "hoilett": hoilett
};

export default function AboutPage() {
  return (
    <div className='aboutPage'>

      <div className='aboutInfo'>
        <div className='header'>
          <h1>About Us</h1>
        </div>

        <div>
          <p>{execList.introTxt.about}</p>
        </div>

        <ol>
          <li>{execList.introTxt.goal1}</li>
          <li>{execList.introTxt.goal2}</li>
          <li>{execList.introTxt.goal3}</li>
        </ol>
      </div>

      <div className='break'/>

      <h2 className='subHeader'>MIND Officers</h2>
      <div className='memberProfiles' id='officers'>
        {getMembers(execList.officers, 'Officers')}
      </div>

      <div className='break'/>

      <h2 className='subHeader'>MIND Senior Executives</h2>
      <div className='memberProfiles' id='seniorExecs'>
        {getMembers(execList.seniorExecs, 'Senior Execs')}
      </div>
      
      <div className='break'/>

      <h2 className='subHeader'>MIND Advisors</h2>
      <div className='memberProfiles' id='advisors'>
        {getMembers(execList.advisors, 'Advisors')}
      </div>

    </div>
  );
};

function getMembers(memberList, type) {
  const formattedProfiles = [];
  for (const index in memberList) {
    const member = memberList[index];
    if (type === 'Officers') {
      formattedProfiles.push(<OfficerProfile
        id={member.id}
        imgSrc={imgList[member.id]}
        name={member.name}
        position={member.position}
        major={member.major}
        minor={member.minor}
        description={member.description}
        outlook={member.outlook}
        linkedIn={member.linkedIn} />)
    } else {
      formattedProfiles.push(<AdvisorProfile
        id={member.id}
        imgSrc={imgList[member.id]}
        name={member.name}
        position={member.position} />)
    }
  }
  return formattedProfiles;
}
