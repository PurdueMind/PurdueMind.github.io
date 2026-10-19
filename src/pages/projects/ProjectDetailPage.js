import { useParams, Link } from 'react-router-dom';

import './ProjectsPage.css';
import '../../App.css';

import Project from './Project';
import PageHero from '../../components/PageHero';
import { buildImageMap } from '../../utils/images';

const projectList = require('./projectList.json');

// Project detail page images live in src/assets/projects/detailed; new ones
// just need to be dropped in without touching this file.
const detailedImages = buildImageMap(require.context('../../assets/projects/detailed', false, /\.(png|jpe?g)$/));

// Team group photos live in src/assets/projects/team
const teamImages = buildImageMap(require.context('../../assets/projects/team', false, /\.(png|jpe?g)$/));

// Award / competition photos live in src/assets/projects/awards
const awardImages = buildImageMap(require.context('../../assets/projects/awards', false, /\.(png|jpe?g)$/));

// Tile images from the Projects page, used when a project has no separate
// detail-page image
const mainImages = buildImageMap(require.context('../../assets/projects/main', false, /\.(png|jpe?g)$/));

// Prefer the detail image (`feature`), then the project's tile image
// (`thumbnail` for current projects, `imgSrc` for older ones)
function getImageSrc(project) {
  return detailedImages[project.feature]
    || mainImages[project.thumbnail || project.imgSrc]
    || detailedImages['defaultImg.jpg'];
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
        <PageHero eyebrow='Error · 404' title='Project Not Found'>
          <div className='heroActions'>
            <Link className='button buttonGhost' to='/Projects'>← Back to projects</Link>
          </div>
        </PageHero>
      </div>
    );
  }

  const isCurrent = projectList.currentProjects.includes(project);

  return (
    <div className='projectsPage'>
      <Project
        imgSrc={getImageSrc(project)}
        alt={project.alt}
        title={project.title}
        status={isCurrent ? 'Active' : 'Archived'}
        teamPhoto={teamImages[project.teamPhoto]}
        awards={project.awards || []}
        awardPhotos={(project.awardPhotos || [])
          .filter((photo) => awardImages[photo.file])
          .map((photo) => ({ ...photo, src: awardImages[photo.file] }))}
        projectCode={project.projectCode}
        description={project.description} />
    </div>
  );
};
