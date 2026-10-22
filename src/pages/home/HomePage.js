import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import './HomePage.css';
import '../../App.css';

import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import AlumniMarquee from './AlumniMarquee';
import CommunityBanner from './CommunityBanner';
import useHashScroll from '../../hooks/useHashScroll';
import { buildImageMap } from '../../utils/images';
import { SLACK_INVITE_URL } from '../../socialLinks';

const statsList = require('./stats.json');
const projectTilesList = require('./projectTiles.json');
const alumniList = require('./alumni.json');

// Each section's images live in their own folder, so new photos just need to
// be dropped in without touching this file.
const activeProjectImages = buildImageMap(require.context('../../assets/home/activeProjects', false, /\.(png|jpe?g)$/));
// Company logos live in src/assets/home/logos, named after the company
// (e.g. "Eli Lilly" -> eli-lilly.svg). A company without a logo file shows
// its name instead, so logos can be added one at a time.
const logoImages = buildImageMap(require.context('../../assets/home/logos', false, /\.(svg|png|jpe?g)$/));

function getLogoSrc(company) {
  const slug = company.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return logoImages[company.logo] || ['svg', 'png', 'jpg'].map((ext) => logoImages[`${slug}.${ext}`]).find(Boolean);
}

const slideshowImageMap = buildImageMap(require.context('../../assets/home/slideshow', false, /\.(png|jpe?g)$/));

// Community photos in the order listed in communityPhotos.json; names that
// don't match a file in the folder are skipped.
const communityPhotos = require('./communityPhotos.json').photos
  .map((name) => slideshowImageMap[name])
  .filter(Boolean);

function getImageSrc(imageName) {
  return activeProjectImages[imageName] || activeProjectImages['defaultImg.jpg'];
}

const CALENDAR_URL = 'https://calendar.google.com/calendar/embed?src=purdueuniversitymind%40gmail.com&ctz=America%2FNew_York';

const pad = (n) => String(n).padStart(2, '0');

// Logos are sized by area rather than by a fixed box, so a wide wordmark and a
// compact emblem carry the same visual weight.
const MOBILE_MAX_WIDTH = 760;

const LOGO_AREA = 2600;
const LOGO_MAX_WIDTH = 170;
const LOGO_MAX_HEIGHT = 50;

function CompanyLogo({ src, name, light }) {
  const [size, setSize] = useState(null);

  const handleLoad = (e) => {
    const aspect = e.target.naturalWidth / e.target.naturalHeight || 2;
    let width = Math.sqrt(LOGO_AREA * aspect);
    let height = width / aspect;
    if (width > LOGO_MAX_WIDTH) { width = LOGO_MAX_WIDTH; height = width / aspect; }
    if (height > LOGO_MAX_HEIGHT) { height = LOGO_MAX_HEIGHT; width = height * aspect; }
    setSize({ width: Math.round(width), height: Math.round(height) });
  };

  return (
    <img
      className={`alumniLogo ${light ? 'alumniLogoLight' : ''}`}
      src={src}
      alt={name}
      onLoad={handleLoad}
      style={size || undefined}
    />
  );
}

export default function HomePage() {
  // Phones get a third row of companies so each row stays short enough to read
  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const alumniRows = isMobile ? 3 : 2;
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
              <div
                className={`homeProjectImg ${tile.imgFit === 'contain' ? 'homeProjectImgContain' : ''}`}
                style={{ backgroundImage: `url(${getImageSrc(tile.imgSrc)})` }} />
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

        <CommunityBanner images={communityPhotos}>
          <p className='communitySlogan'>
            Connecting students, faculty, and industry leaders to build Purdue's MedTech community.
          </p>
          <a className='button buttonGold' href={SLACK_INVITE_URL} target='_blank' rel='noopener noreferrer'>Join our Slack</a>
        </CommunityBanner>
      </section>

      <section className='section container'>
        <SectionHeader id='alumni' index='03' title="Where We've Worked" />
        <p className='alumniIntro'>Companies where MIND members have interned and alumni now work.</p>

        {/* Companies are dealt across the rows, which scroll in alternating
            directions and can be swiped */}
        <AlumniMarquee
          rows={Array.from({ length: alumniRows }, (_, row) =>
            alumniList.companies.filter((_, i) => i % alumniRows === row))}
          renderItem={(company, i, isCopy) => (
            <div className='alumniTile' key={i} aria-hidden={isCopy}>
              {getLogoSrc(company)
                ? <CompanyLogo src={getLogoSrc(company)} name={company.name} light={company.logoTone === 'light'} />
                : <span className='alumniName'>{company.name}</span>}
            </div>
          )}
        />
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
