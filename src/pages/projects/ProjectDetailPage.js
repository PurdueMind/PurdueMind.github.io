import { useParams, Link } from 'react-router-dom';

import './ProjectsPage.css';
import '../../App.css';

import Project from './Project';
import { getImageSrc } from './projectImages';

const projectList = require('./projectList.json');

function findProject(slug) {
  const allProjects = [...projectList.currentProjects, ...projectList.pastProjects];
  return allProjects.find(p => (p.slug || p.id).toLowerCase() === slug.toLowerCase());
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProject(slug);

  if (!project) {
    return (
      <div className='projectsPage'>
        <h1 className='header'>Project Not Found</h1>
        <Link to='/Projects'>Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className='projectsPage'>
      <Project
        id={project.id}
        imgSrc={getImageSrc(project.imgSrc)}
        alt={project.alt}
        title={project.title}
        lead={project.lead}
        description={project.description} />
    </div>
  );
};