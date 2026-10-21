import { Link } from 'react-router-dom';

import './Project.css';
import '../../App.css';
import LeadProfile from '../people/components/Lead';
import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import { buildImageMap } from '../../utils/images';

import defaultHeadshot from '../../assets/people/default.png';

const leaderList = require('../people/leaderList.json');

// Team leads are the only role Project.js shows, so only that folder is needed here.
const leadImages = buildImageMap(require.context('../../assets/people/leads', false, /\.(png|jpe?g)$/));

function getImageForMember(member) {
  return (member && leadImages[member.filename]) || defaultHeadshot;
}

export default function Projects(
  {
    imgSrc,
    alt = '404: No Image',
    title,
    status,
    teamPhoto,
    awards = [],
    awardPhotos = [],
    description,
    projectCode = '' // matches a lead's teamCode in leaderList.json
  }) {
  const leads = getProfile(leaderList, projectCode);
  const eyebrow = ['Project', projectCode && projectCode.toUpperCase(), status].filter(Boolean).join(' · ');

  // Sections after Overview are optional, so number them as they render
  let sectionCount = 1;
  const nextIndex = () => String(++sectionCount).padStart(2, '0');

  return (
    <div className='project'>
      <PageHero eyebrow={eyebrow} title={title}>
        <div className='heroActions'>
          <Link className='button buttonGhost' to='/Projects'>← All projects</Link>
        </div>
      </PageHero>

      <section className='section container'>
        <SectionHeader index='01' title='Overview' />
        <div className='projectInfoDiv'>
          <figure className='figure projectFigure'>
            <img className='projectImage' src={imgSrc} alt={alt}/>
          </figure>
          <ol className='projectDescription'>
            {description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      {teamPhoto &&
        <section className='section container projectLeadSection'>
          <SectionHeader index={nextIndex()} title='Team' />
          <figure className='figure projectTeamFigure'>
            <img className='projectImage' src={teamPhoto} alt={`${title} team`} />
          </figure>
        </section>
      }

      {awards.length > 0 &&
        <section className='section container projectLeadSection'>
          <SectionHeader index={nextIndex()} title='Awards & Recognition' meta={`${awards.length} ${awards.length === 1 ? 'award' : 'awards'}`} />
          <dl className='awardTable'>
            {awards.map((award, i) => (
              <div className='awardRow' key={award.title}>
                <dt className='awardIndex'>AW-{String(i + 1).padStart(2, '0')}</dt>
                <dd className='awardTitle'>{award.title}</dd>
                <dd className='awardEvent'>{award.event}</dd>
              </div>
            ))}
          </dl>
          {awardPhotos.length > 0 &&
            <div className='awardPhotoGrid'>
              {awardPhotos.map((photo) => (
                <figure className='figure awardFigure' key={photo.file}>
                  <img className='awardImage' src={photo.src} alt={photo.caption} />
                  <figcaption className='figureCaption'>
                    <span>{photo.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          }
        </section>
      }

      {leads.length > 0 &&
        <section className='section container projectLeadSection'>
          <SectionHeader index={nextIndex()} title='Project Leadership Team' meta={`${leads.length} ${leads.length === 1 ? 'lead' : 'leads'}`} />
          <div className='cardGrid projectLeadGrid'>
            {leads}
          </div>
        </section>
      }
    </div>
  );
};

function getProfile(memberList, projectCode) {
  if (!projectCode) return [];

  const allLeads = [...memberList.leads, ...memberList.subleads];
  const projectLeads = allLeads.filter(m => m.teamCode === projectCode);

  return projectLeads.map(member => (
    <LeadProfile
      key={`${member.teamCode}-${member.name}`}
      imgSrc={getImageForMember(member)}
      name={member.name}
      team={"Project Lead"}
      major={member.major}
      email={member.email}
      linkedIn={member.linkedIn} />
  ));
}
