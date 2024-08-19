import './AboutPage.css';
import '../../App.css';

import pres from '../../assets/headshots/dalton.png'
import vice from '../../assets/headshots/simon.jpeg'
import treasurer from '../../assets/headshots/default.png'
import secretary from '../../assets/headshots/default.png'
import rNd from '../../assets/headshots/grant.jpg'
import nNe from '../../assets/headshots/sam.jpg'

import lee from '../../assets/headshots/default.png'

import hammad from '../../assets/headshots/default.png'
import rahaf from '../../assets/headshots/default.png'
import zach from '../../assets/headshots/default.png'
import barrett from '../../assets/headshots/default.png'

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';

const execList = require('./boardList.json');
const imgList = {
  "president": pres, 
  "vice": vice,
  "treasurer": treasurer,
  "secretary": secretary,
  "rNd": rNd,
  "nNe": nNe,
  "lee": lee,
  "hammad": hammad,
  "rahaf": rahaf,
  "zach": zach,
  "barrett": barrett
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
