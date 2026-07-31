import './ProjectsPage.css';
import '../../App.css';

import Project from './Project';

import defaultImg from '../../assets/projects/defaultImg.jpg';
import exomindGlove from '../../assets/projects/exomindGlove.jpeg';
import gripAssist from '../../assets/projects/gripAssist.jpg';
import hydraCheck from '../../assets/projects/hydraCheck.png';
import ptsdCollar from '../../assets/projects/ptsdCollar.jpg';
import smartSock from '../../assets/projects/smartSock.jpeg';
import tmap from '../../assets/projects/tmap.png';
import vertiFix from '../../assets/projects/vertiFix.jpeg';
import walkerProject from '../../assets/projects/walkerProject.png';

const projectList = require('./projectList.json');

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
function getImageSrc(imageName) {
  return images[imageName] || images['defaultImg.jpg'];
}

export default function ProjectsPage() {
  return (
    <div className='projectsPage'>
      <h1 className='header'>Projects</h1>
      
      <div className='projectsContainer'>
        <h2 className="sectionHeader">Current Mind Projects</h2>
        {getProjects(projectList.currentProjects)}
      </div>

      <div id='spacer'/>

      <div className='projectsContainer'>
        <h2 className="sectionHeader">Past Mind Projects</h2>
        {getProjects(projectList.pastProjects)}
      </div>
    </div>
  );
};

function getProjects(projects) {
  const formattedProjects = [];
  for (const index in projects) {
    const project = projects[index];
    formattedProjects.push(<Project
      id={project.title}
      imgSrc={getImageSrc(project.imgSrc)}
      alt={project.alt}
      title={project.title}
      lead={project.lead}
      description={project.description} />)
  }
  return formattedProjects;
}
