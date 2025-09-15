import './OnboardingPage.css';
import '../../App.css';
import Project from './Project';

import mlFiles from '../../assets/onboarding/Arduino-Onboarding.pdf';
import cadFiles from '../../assets/onboarding/cad-workshop-2025.zip';
import electronicsFiles from '../../assets/onboarding/Electronics-Onboarding.pdf';

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
            
            <div className="onboardingInformation">
                <ul>
                    <li>Onboarding takes place every Monday and Thursday from September 4th to September 18th</li>
                    <li>All sessions are held in person in MJIS 1001 at 6:30 PM</li>
                    <li>Learn circuit & PCB design, SolidWorks (CAD), and Arduino circuitry and programming</li>
                </ul>
            </div>

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
            buttonName={workshop.buttonName}
            description={workshop.description}
            downloadFile={fileList[workshop.id]}
            downloadFilename={workshop.filename}
        />);
    }
    return formattedProjects;
}