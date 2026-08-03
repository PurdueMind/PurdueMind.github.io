import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';
import '../../App.css';

const statsList = require('./stats.json');
const projectTilesList = require('./projectTiles.json');

// Each section's images live in their own folder; require.context loads them
// all so new photos just need to be dropped in without touching this file.
function buildImageMap(context) {
  const images = {};
  context.keys().forEach((key) => {
    const mod = context(key);
    images[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
  });
  return images;
}

const activeProjectImages = buildImageMap(require.context('../../assets/home/activeProjects', false, /\.(png|jpe?g)$/));
const slideshowImages = buildImageMap(require.context('../../assets/home/slideshow', false, /\.(png|jpe?g)$/));

// Function to get image source with fallback
function getImageSrc(imageName) {
  return activeProjectImages[imageName] || activeProjectImages['defaultImg.jpg'];
}

// Placeholder rotation of images for the image slideshow until real photos are ready
const slideshowPlaceholderImages = Object.values(slideshowImages);
const IMAGE_SLIDE_INTERVAL_MS = 4500;
const IMAGE_FADE_DURATION_MS = 1500;

export default function HomePage() {
  const stats = statsList.stats;
  // duplicated so the CSS scroll animation can loop seamlessly at -50%
  const loopedStats = [...stats, ...stats];
  const projectTiles = projectTilesList.projectTiles;

  const [imageIndex, setImageIndex] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade the current image out, swap the source, then fade the new one in
      setImageVisible(false);
      setTimeout(() => {
        setImageIndex((i) => (i + 1) % slideshowPlaceholderImages.length);
        setImageVisible(true);
      }, IMAGE_FADE_DURATION_MS);
    }, IMAGE_SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='homePage'>
      <div className='majorTitleDiv'>
        <h1 className='majorTitle' id='pitchWord1'>Medical Innovation, Networking,<br/>and Design Club</h1>
      </div>
      <div className='statDiv'>
        <div className='descDiv'>
          <p className='desc-text'>Purdue's <b>only</b> project-based <br/> biomedical engineering club</p>
        </div>
        <div className='slideshowDiv'>
          <div className='statTrack'>
            {loopedStats.map((stat, i) => (
              <div className='statItem' key={i}>
                <div className='statBox'>
                  <span className='statNumber'>{stat.number}{stat.unit}</span>
                  <p className='statDescription'>{stat.description}</p>
                </div>
                <div className='statDivider' />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='break'/>
      <div className='sectionDiv'>

        <div className='sectionTitleDiv' id='peopleMiddleDiv'>
          <div className='sectionTitleLeftDiv'>
            <h1 className='sectionTitle'>Active Projects</h1>
          </div>
          <div className='sectionTitleRightDiv'/>
        </div>

        <div className='projectTilesRow'>
          {projectTiles.map((tile) => (
            <div
              className='projectTile'
              key={tile.id}
              style={{ backgroundImage: `url(${getImageSrc(tile.imgSrc)})` }}>
              <Link to={`/Projects/${tile.projectPage}`}>
                <span className='tileLabel'>{tile.team}</span>
                <div className='tileOverlay'>
                  <p className='projectTileDescription'>{tile.info}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
      <div className='break'/>
      <div className='sectionDiv'>
        <div className='leftHalfDiv'>
          <div className='imageSlideshow'>
            <img
              className={`imageSlideshowImg ${imageVisible ? '' : 'imageSlideshowImgHidden'}`}
              src={slideshowPlaceholderImages[imageIndex]}
              alt='Project preview placeholder'
            />
          </div>
        </div>
        <div className='rightHalfDiv'>
          <div className='upperHalfDiv'>
            <p className='desc-text' id='slogan'>Connecting students, faculty,<br/>and industry leaders to build<br/>Purdue's MedTech community</p>
          </div>
          <div className='lowerHalfDiv'>
            <button className='sectionButton'><b>Join our Slack</b></button>
          </div>
        </div>
      </div>
      <div className='break'/>
      <div className='sectionDiv'>

        <div className='sectionTitleDiv' id='peopleMiddleDiv'>
          <div className='sectionTitleLeftDiv'>
            <h1 className='sectionTitle'>Meetings & Events</h1>
          </div>
          <div className='sectionTitleRightDiv'/>
        </div>

        <iframe 
            id='calendar' title='MIND Calendar'
            src='https://calendar.google.com/calendar/embed?src=purdueuniversitymind%40gmail.com&ctz=America%2FNew_York'
            style={{border: 'solid 1px #777', filter: 'invert(90%) hue-rotate(180deg)'}}
            width={window.innerWidth * .8}
            height='600'
            frameborder='0'
        />
      </div>
    </div>
  );
};
/*
<div id='imageContainer' style={{ display: 'flex', justifyContent: 'center'}}>
        <img
          src={ToDisplay}
          alt='Purdue MIND'
          style={{ width: '80%', maxWidth: 900, height: 'auto', border: 'solid 1px #777' }}
        />
      </div>
<h2><a href="https://forms.gle/AW5sP5hvR4kH7YYG9" target="_blank" rel="noopener noreferrer">Click Here for Submission Form!</a></h2>

<h1>Purdue MIND</h1>

      <p>Purdue MIND is a multidisciplinary student organization that promotes and grows the biomedical engineering community by providing undergraduates with hands-on experience in medical technology innovation—from research and design to commercialization—while fostering collaboration, professional networking, and participation in national design competitions.</p>

      <h2><a href="https://join.slack.com/t/purdue-mind-workspace/shared_invite/zt-3cy3ljpxd-RqL5fJwChYdRKniiasXepw" target="_blank" rel="noopener noreferrer">Join our Slack!</a></h2>

      <h2 id='eventsTxt'>Calendar</h2>

      
*/