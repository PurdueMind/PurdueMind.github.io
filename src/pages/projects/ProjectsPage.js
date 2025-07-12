import './ProjectsPage.css';
import '../../App.css';

import Project from './Project';

const projectList = require('./projectList.json');

// Function to dynamically import all images from the projects folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item, _) => {
    images[item.replace('./', '')] = r(item).default;
  });
  return images;
}

// Import all images from the projects directory
const images = importAll(
  require.context('../../assets/projects', false, /\.(png|jpe?g)$/i)
);

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
      description={project.description} />)
  }
  return formattedProjects;
}
