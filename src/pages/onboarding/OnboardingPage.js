import './OnboardingPage.css';
import '../../App.css';
import Project from './Project';

import mlFiles from '../../assets/onboarding/ml-project.zip';
import cadFiles from '../../assets/onboarding/cad-project.zip';
import electronicsFiles from '../../assets/onboarding/electronics-project.zip';

const projectList = require('./projectList.json');

const fileList = {
    'ml-project': mlFiles,
    'cad-project': cadFiles,
    'electronics-project': electronicsFiles
}

export default function OnboardingPage() {
    // get current year
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className='OnboardingPage'>
            <h1 className='header'>Onboarding</h1>
            <div className='projectContainer'>
                <h2 className="sectionHeader">{year} Onboarding Projects</h2>
                {getProjects(projectList.projects)}
            </div>
        </div>
    );
};

function getProjects(projects) {
    const formattedProjects = [];
    for (const index in projects) {
        const workshop = projects[index];
        formattedProjects.push(<Project
            id={workshop.title}
            title={workshop.title}
            description={workshop.description}
            downloadFile={fileList[workshop.id]}
            downloadFilename={workshop.filename}
        />);
    }
    return formattedProjects;
}