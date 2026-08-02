import './ProjectsPage.css';
import '../../App.css';

import ProjectTile from './ProjectTile';
import { getImageSrc } from './projectImages';

const projectList = require('./projectList.json');

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
          key={project.id}
          slug={project.slug || project.id}
          imgSrc={getImageSrc(project.imgSrc)}
          alt={project.alt}
          title={project.title}
          description={project.description} />
      ))}
    </div>
  );
}
