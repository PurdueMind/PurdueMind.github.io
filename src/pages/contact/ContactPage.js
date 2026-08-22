import './ContactPage.css';
import '../../App.css';

import OfficerProfile from '../people/components/Officer';
import EmailLink from '../people/components/EmailLink';
import instagramLogo from '../../assets/logos/instagram.png';
import defaultHeadshot from '../../assets/people/default.png';

const leaderList = require('../people/leaderList.json');

const execContext = require.context('../../assets/people/exec', false, /\.(png|jpe?g)$/);
const execImages = {};
execContext.keys().forEach((key) => {
  const mod = execContext(key);
  execImages[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
});

function getImageSrc(filename) {
  return execImages[filename] || defaultHeadshot;
}

const CONTACT_EMAIL = 'purdueuniversitymind@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/purdue.mind/';

const president = leaderList.officers.find((officer) => officer.position === 'President');
const vicePresident = leaderList.officers.find((officer) => officer.position === 'Vice President');

export default function ContactPage() {
  return (
    <div className='contactPage'>
      <div className='majorTitleDiv'>
        <h1 className='majorTitle' id='majorContactTitle'>Contact Us</h1>
      </div>

      <div className='contactSection'>
        <div className='contactLeadershipCol'>
          <h2 className='contactColTitle'>Reach Our Leadership</h2>
          <div className='contactLeadershipRow'>
            {president &&
              <OfficerProfile
                imgSrc={getImageSrc(president.filename)}
                name={president.name}
                position={president.position}
                major={president.major}
                email={president.email}
                linkedIn={president.linkedIn} />
            }
            {vicePresident &&
              <OfficerProfile
                imgSrc={getImageSrc(vicePresident.filename)}
                name={vicePresident.name}
                position={vicePresident.position}
                major={vicePresident.major}
                email={vicePresident.email}
                linkedIn={vicePresident.linkedIn} />
            }
          </div>
        </div>

        <div className='contactInfoCol'>
          <h2 className='contactColTitle'>Get In Touch</h2>
          <div className='contactIconRow'>
            <EmailLink email={CONTACT_EMAIL} />
            <a
              className='iconButton'
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Purdue MIND on Instagram'
              data-tooltip='Instagram'
            >
              <img className='iconImg' src={instagramLogo} alt='Instagram' />
            </a>
          </div>

          {/* Placeholder until we have a permanent Slack invite link */}
          <button className='contactSlackButton'><b>Join our Slack</b></button>
        </div>
      </div>
    </div>
  );
};
