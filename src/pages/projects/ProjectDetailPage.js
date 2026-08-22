import { useParams, Link } from 'react-router-dom';

import './ProjectsPage.css';
import '../../App.css';

import Project from './Project';

const projectList = require('./projectList.json');

// Project detail page images live in src/assets/projects/detailed; new ones
// just need to be dropped in without touching this file.
const detailedImageContext = require.context('../../assets/projects/detailed', false, /\.(png|jpe?g)$/);

const detailedImages = {};
detailedImageContext.keys().forEach((key) => {
  const mod = detailedImageContext(key);
  detailedImages[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
});

function getImageSrc(filename) {
  return detailedImages[filename] || detailedImages['defaultImg.jpg'];
}

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
        imgSrc={getImageSrc(project.feature)}
        alt={project.alt}
        title={project.title}
        projectCode={project.projectCode}
        description={project.description} />
    </div>
  );
};