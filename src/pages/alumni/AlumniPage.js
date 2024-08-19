import './AlumniPage.css';
import '../../App.css';

import sriram     from '../../assets/headshots/sam.jpg'
import pablo      from '../../assets/headshots/pablo.png'
import samuel     from '../../assets/headshots/samuel.png'
import dane       from '../../assets/headshots/default.png'
import scott      from '../../assets/headshots/scott.png'
import pragna     from '../../assets/headshots/pragna.png'
import david      from '../../assets/headshots/default.png'
import michaeld   from '../../assets/headshots/default.png'
import jason      from '../../assets/headshots/default.png'
import barrett    from '../../assets/headshots/barrett.png'
import michaelw   from '../../assets/headshots/default.png'
import ali        from '../../assets/headshots/default.png'
import neal       from '../../assets/headshots/neal.png'
import matt       from '../../assets/headshots/default.png'

import AlumniProfile from './components/Alumni';

const alumniList = require('./alumniList.json');
const imgList = {
  "sriram"    : sriram,
  "pablo"     : pablo,
  "samuel"    : samuel,
  "dane"      : dane,
  "scott"     : scott,
  "pragna"    : pragna,
  "david"     : david,
  "michaeld"  : michaeld,
  "jason"     : jason,
  "barrett"   : barrett,
  "michaelw"  : michaelw,
  "ali"       : ali,
  "neal"      : neal,
  "matt"      : matt
};

export default function AlumniPage() {
  return (
    <div className='alumniPage'>

      <h1 className='header'>MIND Alumni</h1>
      <div className='memberProfiles' id='officers'>
        {getMembers(alumniList.alumni, 'Alumni')}
      </div>

    </div>
  );
};

function getMembers(memberList, type) {
  const formattedProfiles = [];
  for (const index in memberList) {
    const member = memberList[index];
    formattedProfiles.push(<AlumniProfile
      id={member.id}
      imgSrc={imgList[member.id]}
      name={member.name}
      position={member.position}
      major={member.major}
      minor={member.minor}
      description={member.description}
      outlook={member.outlook}
      linkedIn={member.linkedIn} />)
  }
  return formattedProfiles;
}
