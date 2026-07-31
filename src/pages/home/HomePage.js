import { useEffect, useState } from 'react';
import './HomePage.css';
import '../../App.css';

import defaultImg from '../../assets/projects/defaultImg.jpg';
import exomindGlove from '../../assets/projects/exomindGlove.jpeg';
import gripAssist from '../../assets/projects/gripAssist.jpg';
import hydraCheck from '../../assets/projects/hydraCheck.png';
import ptsdCollar from '../../assets/projects/ptsdCollar.jpg';
import smartSock from '../../assets/projects/smartSock.jpeg';
import tmap from '../../assets/projects/tmap.png';
import vertiFix from '../../assets/projects/vertiFix.jpeg';
import walkerProject from '../../assets/projects/walkerProject.png';

const statsList = require('./stats.json');
const projectTilesList = require('./projectTiles.json');

// Static map of image filename (as referenced in projectTiles.json) to its imported asset
const projectImages = {
  'defaultImg.jpg': defaultImg,
  'exomindGlove.jpeg': exomindGlove,
  'gripAssist.jpg': gripAssist,
  'hydraCheck.png': hydraCheck,
  'ptsdCollar.jpg': ptsdCollar,
  'smartSock.jpeg': smartSock,
  'tmap.png': tmap,
  'vertiFix.jpeg': vertiFix,
  'walkerProject.png': walkerProject,
};

// Function to get image source with fallback
function getImageSrc(imageName) {
  return projectImages[imageName] || projectImages['defaultImg.jpg'];
}

// Placeholder rotation of images for the image slideshow until real photos are ready
const slideshowPlaceholderImages = Object.values(projectImages);
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
      <div className='pitchDiv'>
        <h1 className='pitchTitle' id='pitchWord1'>Solutions that Heal</h1>
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
      <div className='homeBreak'/>
      <div className='sectionDiv'>
        <h2 className='minorTitle' id='projectDemoTitle'><b>Active Projects</b></h2>

        <div className='projectTilesRow'>
          {projectTiles.map((tile) => (
            <div
              className='projectTile'
              key={tile.id}
              style={{ backgroundImage: `url(${getImageSrc(tile.imgSrc)})` }}
            >
              <span className='tileLabel'>{tile.team}</span>
              <div className='tileOverlay'>
                <p>{tile.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='homeBreak'/>
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
            <p className='desc-text' id='slogan'>Connecting students, faculty,<br/>and industry leaders to <b>build</b><br/>Purdue's MedTech community</p>
          </div>
          <div className='lowerHalfDiv'>
            <button className='sectionButton'><b>Join our Slack</b></button>
          </div>
        </div>
      </div>
      <div className='homeBreak'/>
      <div className='sectionDiv'>
        <h2 className='minorTitle'><b>Meetings & Events</b></h2>
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