import './ContactPage.css';
import '../../App.css';

import OfficerProfile from '../people/components/Officer';
import LeadProfile from '../people/components/Lead';
import EmailLink from '../people/components/EmailLink';
import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import { buildImageMap } from '../../utils/images';
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, SLACK_INVITE_URL } from '../../socialLinks';
import defaultHeadshot from '../../assets/people/default.png';

const leaderList = require('../people/leaderList.json');

const execImages = buildImageMap(require.context('../../assets/people/exec', false, /\.(png|jpe?g)$/));
const leadImages = buildImageMap(require.context('../../assets/people/leads', false, /\.(png|jpe?g)$/));

function getImageSrc(images, filename) {
  return images[filename] || defaultHeadshot;
}


export default function ContactPage() {
  return (
    <div className='contactPage'>
      <PageHero eyebrow='Contact · Get in touch' title='Contact Us'>
        <p className='heroBody'>Questions about joining, projects, or partnering with MIND? Reach us through any channel below.</p>
      </PageHero>

      <section className='section container'>
        <div className='contactInfoCol'>
          <SectionHeader index='01' title='Channels' />
          <dl className='contactTable'>
            <div className='contactRow'>
              <dt>Email</dt>
              <dd>
                <a className='contactEmail' href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <EmailLink email={CONTACT_EMAIL} />
              </dd>
            </div>
            <div className='contactRow'>
              <dt>Instagram</dt>
              <dd><a href={INSTAGRAM_URL} target='_blank' rel='noopener noreferrer'>@purdue.mind</a></dd>
            </div>
            {LINKEDIN_URL &&
              <div className='contactRow'>
                <dt>LinkedIn</dt>
                <dd><a href={LINKEDIN_URL} target='_blank' rel='noopener noreferrer'>Purdue MIND</a></dd>
              </div>
            }
            <div className='contactRow'>
              <dt>Slack</dt>
              <dd><a href={SLACK_INVITE_URL} target='_blank' rel='noopener noreferrer'>Purdue MIND workspace</a></dd>
            </div>
          </dl>
          <a
            className='button buttonPrimary'
            href={SLACK_INVITE_URL}
            target='_blank'
            rel='noopener noreferrer'
          >Join our Slack</a>
        </div>
      </section>

      <section className='section container contactSectionFollow'>
        <SectionHeader index='02' title='Executive Board' meta={`${leaderList.officers.length} members`} />
        <div className='cardGrid'>
          {leaderList.officers.map((officer) => (
            <OfficerProfile
              key={officer.name}
              imgSrc={getImageSrc(execImages, officer.filename)}
              name={officer.name}
              position={officer.position}
              major={officer.major}
              email={officer.email}
              linkedIn={officer.linkedIn} />
          ))}
        </div>
      </section>

      <section className='section container contactSectionFollow'>
        <SectionHeader index='03' title='Team Leads' meta={`${leaderList.leads.length} members`} />
        <div className='cardGrid'>
          {leaderList.leads.map((lead) => (
            <LeadProfile
              key={lead.name}
              imgSrc={getImageSrc(leadImages, lead.filename)}
              name={lead.name}
              team={lead.team}
              major={lead.major}
              email={lead.email}
              linkedIn={lead.linkedIn} />
          ))}
        </div>
      </section>
    </div>
  );
};
