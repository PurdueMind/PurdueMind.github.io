import './ProjectsPage.css';
import '../../App.css';

import ProjectTile from './ProjectTile';
import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import { buildImageMap } from '../../utils/images';

const projectList = require('./projectList.json');

// Project tile images live in src/assets/projects/main; new ones just need
// to be dropped in without touching this file.
const mainImages = buildImageMap(require.context('../../assets/projects/main', false, /\.(png|jpe?g)$/));

// Current projects name their tile image `thumbnail`, older entries `imgSrc`
function getImageSrc(project) {
  return mainImages[project.thumbnail || project.imgSrc] || mainImages['defaultImg.jpg'];
}

export default function ProjectsPage() {
  return (
    <div className='projectsPage'>
      <PageHero eyebrow='Projects · Design teams' title='Projects'>
        <p className='heroBody'>Student teams designing medical devices from problem definition through prototype.</p>
      </PageHero>

      <section className='section container'>
        <SectionHeader index='01' title='Active Projects' meta={`${projectList.currentProjects.length} teams`} />
        {getProjectTiles(projectList.currentProjects, 'A')}
      </section>

      <section className='section container projectsSectionFollow'>
        <SectionHeader index='02' title='Previous Projects' meta={`${projectList.pastProjects.length} archived`} />
        {getProjectTiles(projectList.pastProjects, 'R')}
      </section>
    </div>
  );
};

function getProjectTiles(projects, codePrefix) {
  return (
    <div className='projectsGrid'>
      {projects.map((project, i) => (
        <ProjectTile
          key={project.slug || project.id}
          slug={project.slug || project.id}
          code={`${codePrefix}-${String(i + 1).padStart(2, '0')}`}
          imgSrc={getImageSrc(project)}
          alt={project.alt}
          title={project.title}
          awardCount={(project.awards || []).length}
          description={project.description} />
      ))}
    </div>
  );
}
