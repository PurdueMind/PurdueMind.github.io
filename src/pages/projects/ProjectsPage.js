import './ProjectsPage.css';
import '../../App.css';

import Project from './Project';

import ptsdCollar from '../../assets/projects/ptsdCollar.jpg';
import hydraCheck from '../../assets/projects/hydraCheck.png';
import triWheels from '../../assets/projects/walkerProject.png';
import tmap from '../../assets/projects/tmap.png';
import vertiFix from '../../assets/projects/vertiFix.jpeg';
import exomind from '../../assets/projects/exomindGlove.jpeg';
import smartSock from '../../assets/projects/smartSock.jpeg';
import defaul from '../../assets/projects/defaultImg.jpg';

const projectList = require('./projectList.json');

const imgList = {
  'muscle-computer': defaul,
  'neurotech': defaul,
  'computational': defaul,
  'biomechanics': defaul,
  'ptsd-dog-collar': ptsdCollar,
  'hydra-check': hydraCheck,
  'tri-wheels': triWheels,
  'smart-sleeve': defaul,
  'tmap': tmap,
  'verti-fix': vertiFix,
  'ambient-sound-bracelet': defaul,
  'exomind-glove': exomind,
  'smart-stock': smartSock
};


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
      imgSrc={imgList[project.id]}
      alt={project.alt}
      title={project.title}
      description={project.description} />)
  }
  return formattedProjects;
}
