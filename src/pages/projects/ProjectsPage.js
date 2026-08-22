import './ProjectsPage.css';
import '../../App.css';

import ProjectTile from './ProjectTile';

const projectList = require('./projectList.json');

// Project tile images live in src/assets/projects/main; new ones just need
// to be dropped in without touching this file.
const mainImageContext = require.context('../../assets/projects/main', false, /\.(png|jpe?g)$/);

const mainImages = {};
mainImageContext.keys().forEach((key) => {
  const mod = mainImageContext(key);
  mainImages[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
});

function getImageSrc(filename) {
  return mainImages[filename] || mainImages['defaultImg.jpg'];
}

export default function ProjectsPage() {
  return (
    <div className='projectsPage'>
      <div className='majorTitleDiv'>
        <h1 className='majorTitle' id='projectsTitle'>Active Projects</h1>
      </div>

      <div className='projectsContainer'>
        {getProjectTiles(projectList.currentProjects)}
      </div>

      <div className='break'/>

      <div className='sectionTitleDiv' id='previousProjectsTitleDiv'>
        <div className='sectionTitleLeftDiv'>
          <h1 className='sectionTitle'>Previous Projects</h1>
        </div>
        <div className='sectionTitleRightDiv'/>
      </div>

      <div className='projectsContainer' id='previousProjectsContainer'>
        {getProjectTiles(projectList.pastProjects)}
      </div>
    </div>
  );
};

function getProjectTiles(projects) {
  return (
    <div className='projectsGrid'>
      {projects.map((project) => (
        <ProjectTile
          slug={project.slug || project.id}
          imgSrc={getImageSrc(project.thumbnail)}
          alt={project.alt}
          title={project.title}
          description={project.description} />
      ))}
    </div>
  );
}
