import './PeoplePage.css';
import '../../App.css';

import OfficerProfile from './components/Officer';
import AdvisorProfile from './components/Advisor';
import LeadProfile from './components/Lead';

import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import useHashScroll from '../../hooks/useHashScroll';
import { buildImageMap } from '../../utils/images';

import defaultHeadshot from '../../assets/people/default.png';

const leaderList = require('./leaderList.json');

// Each role's photos live in their own folder, so new headshots just need to
// be dropped in without touching this file.
const imagesByType = {
  Officers: buildImageMap(require.context('../../assets/people/exec', false, /\.(png|jpe?g)$/)),
  Leads: buildImageMap(require.context('../../assets/people/leads', false, /\.(png|jpe?g)$/)),
  Advisors: buildImageMap(require.context('../../assets/people/advisors', false, /\.(png|jpe?g)$/)),
};

function getImageSrc(type, filename) {
  return (imagesByType[type] && imagesByType[type][filename]) || defaultHeadshot;
}

export default function PeoplePage() {
  useHashScroll();

  return (
    <div className='peoplePage'>
      <PageHero eyebrow='People · Leadership' title='Our People'>
        <p className='heroBody'>The students and faculty who run MIND's project teams, events, and operations.</p>
      </PageHero>

      <section className='section container peopleSection'>
        <SectionHeader id='officersBreak' index='01' title='Executive Board' meta={`${leaderList.officers.length} members`} />
        <div className='cardGrid'>
          {getProfile(leaderList.officers, 'Officers')}
        </div>
      </section>

      <section className='section container peopleSection'>
        <SectionHeader id='peopleMiddleDiv' index='02' title='Team Leads' meta={`${leaderList.leads.length} members`} />
        <div className='cardGrid'>
          {getProfile(leaderList.leads, 'Leads')}
        </div>
      </section>

      <section className='section container peopleSection'>
        <SectionHeader id='peopleBottomDiv' index='03' title='Advisors' meta={`${leaderList.advisors.length} members`} />
        <div className='cardGrid'>
          {getProfile(leaderList.advisors, 'Advisors')}
        </div>
      </section>
    </div>
  );
};

function getProfile(memberList, type) {
  return memberList.map((member) => {
    const imgSrc = getImageSrc(type, member.filename);
    if (type === 'Officers') {
      return <OfficerProfile
        key={member.name}
        imgSrc={imgSrc}
        name={member.name}
        position={member.position}
        major={member.major}
        email={member.email}
        linkedIn={member.linkedIn} />;
    }
    if (type === 'Leads') {
      return <LeadProfile
        key={member.name}
        imgSrc={imgSrc}
        name={member.name}
        team={member.team}
        major={member.major}
        email={member.email}
        linkedIn={member.linkedIn} />;
    }
    return <AdvisorProfile
      key={member.name}
      imgSrc={imgSrc}
      name={member.name}
      position={member.position}
      email={member.email} />;
  });
}
