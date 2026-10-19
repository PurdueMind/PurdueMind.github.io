import { Link } from 'react-router-dom';

import './HomePage.css';
import '../../App.css';

import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import Slideshow from '../../components/Slideshow';
import useHashScroll from '../../hooks/useHashScroll';
import { buildImageMap } from '../../utils/images';

const statsList = require('./stats.json');
const projectTilesList = require('./projectTiles.json');
const alumniList = require('./alumni.json');

// Each section's images live in their own folder, so new photos just need to
// be dropped in without touching this file.
const activeProjectImages = buildImageMap(require.context('../../assets/home/activeProjects', false, /\.(png|jpe?g)$/));
const slideshowImages = Object.values(buildImageMap(require.context('../../assets/home/slideshow', false, /\.(png|jpe?g)$/)));

function getImageSrc(imageName) {
  return activeProjectImages[imageName] || activeProjectImages['defaultImg.jpg'];
}

const SLACK_INVITE_URL = 'https://join.slack.com/t/purdue-mind-workspace/shared_invite/zt-47kw5vc6b-DeXzB8Jmg2IsORDEC_c2fg';
const CALENDAR_URL = 'https://calendar.google.com/calendar/embed?src=purdueuniversitymind%40gmail.com&ctz=America%2FNew_York';

const pad = (n) => String(n).padStart(2, '0');

export default function HomePage() {
  useHashScroll();
  const stats = statsList.stats;
  const projectTiles = projectTilesList.projectTiles;

  return (
    <div className='homePage'>
      <PageHero
        eyebrow='Purdue University · Biomedical Engineering'
        title={<><span className='acronym'>M</span>edical <span className='acronym'>I</span>nnovation, <span className='acronym'>N</span>etworking, and <span className='acronym'>D</span>esign Club</>}
      >
        <p className='heroBody'>Purdue's largest project-based biomedical engineering club.</p>
        <div className='heroActions'>
          <a className='button buttonGold' href={SLACK_INVITE_URL} target='_blank' rel='noopener noreferrer'>Join our Slack</a>
          <Link className='button buttonGhost' to='/Projects'>View projects →</Link>
        </div>
      </PageHero>

      <div className='statStrip'>
        {/* The list is rendered twice so the track can loop seamlessly at -50% */}
        <div className='statTrack'>
          {[...stats, ...stats].map((stat, i) => (
            <div className='statCell' key={i} aria-hidden={i >= stats.length}>
              <span className='statNumber'>{stat.number}{stat.unit}</span>
              <span className='statDescription'>{stat.description}</span>
            </div>
          ))}
        </div>
      </div>

      <section className='section container'>
        <SectionHeader id='activeProjects' index='01' title='Active Projects' meta={`${projectTiles.length} teams`} />

        <div className='projectTilesRow'>
          {projectTiles.map((tile, i) => (
            <Link className='homeProjectCard' key={tile.id} to={`/Projects/${tile.projectPage}`}>
              <div className='homeProjectImg' style={{ backgroundImage: `url(${getImageSrc(tile.imgSrc)})` }} />
              <div className='homeProjectInfo'>
                <span className='homeProjectCode'>P-{pad(i + 1)}</span>
                <h3 className='homeProjectTitle'>{tile.team}</h3>
                {tile.info && <p className='homeProjectDescription'>{tile.info}</p>}
                <span className='homeProjectLink'>View project →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='section container'>
        <SectionHeader index='02' title='Community' />

        <div className='communityGrid'>
          <Slideshow images={slideshowImages} alt='MIND project photo' caption='Fig. 01 — Project gallery' height={380} />
          <div className='communityText'>
            <p className='communitySlogan'>
              Connecting students, faculty, and industry leaders to build Purdue's MedTech community.
            </p>
            <a className='button buttonPrimary' href={SLACK_INVITE_URL} target='_blank' rel='noopener noreferrer'>Join our Slack</a>
          </div>
        </div>
      </section>

      <section className='section container'>
        <SectionHeader id='alumni' index='03' title='Where Our Alumni Go' />

        <div className='alumniGrid'>
          {alumniList.companies.map((company, i) => (
            <div className={`alumniTile ${company.placeholder ? 'alumniTilePlaceholder' : ''}`} key={i}>
              <span className='alumniName'>{company.placeholder ? 'Company TBD' : company.name}</span>
              <span className='alumniSector'>{company.sector}</span>
            </div>
          ))}
        </div>
      </section>

      <section className='section container'>
        <SectionHeader id='calendarBreak' index='04' title='Meetings & Events' meta='Eastern Time' />

        <div className='figure calendarFrame'>
          <iframe
            id='calendar'
            title='MIND Calendar'
            src={CALENDAR_URL}
            frameBorder='0'
          />
        </div>
      </section>
    </div>
  );
};
