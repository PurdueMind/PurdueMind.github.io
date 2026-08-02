import defaultImg from '../../assets/projects/defaultImg.jpg';
import exomindGlove from '../../assets/projects/exomindGlove.jpeg';
import gripAssist from '../../assets/projects/gripAssist.jpg';
import hydraCheck from '../../assets/projects/hydraCheck.png';
import ptsdCollar from '../../assets/projects/ptsdCollar.jpg';
import smartSock from '../../assets/projects/smartSock.jpeg';
import tmap from '../../assets/projects/tmap.png';
import vertiFix from '../../assets/projects/vertiFix.jpeg';
import walkerProject from '../../assets/projects/walkerProject.png';

// Static map of image filename (as referenced in projectList.json) to its imported asset
const images = {
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
export function getImageSrc(imageName) {
  return images[imageName] || images['defaultImg.jpg'];
}