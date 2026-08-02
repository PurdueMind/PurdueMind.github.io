import './OnboardingPage.css';
import '../../App.css';
import Workshop from './Workshop';

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
    return (
        <div className='OnboardingPage'>
            <div className='majorTitleDiv'>
                <h1 className='majorTitle' id='onboardingTitle'>Onboarding & Workshops</h1>
            </div>

            <div className='peoplePitchDiv'>
                <h3 id='peoplePitch'>
                    INSERT SCROLLING IMAGES OF WORKSHOPS HERE
                </h3>
            </div>

            <div className='break'/>

            <div className='sectionTitleDiv'>
                <div className='sectionTitleLeftDiv'>
                    <h1 className='sectionTitle'>Onboarding</h1>
                </div>
                <div className='sectionTitleRightDiv'/>
            </div>

            <div className='onboardingContainer'>
                {getProjects(projectList.onboarding)}
            </div>

            <div className='smallBreak'/>

            <div className='sectionTitleDiv'>
                <div className='sectionTitleLeftDiv'>
                    <h1 className='sectionTitle'>Workshops</h1>
                </div>
                <div className='sectionTitleRightDiv'/>
            </div>

            <div className='onboardingContainer'>
                {getProjects(projectList.workshops)}
            </div>
        </div>
    );
};

function getProjects(projects) {
    const formattedProjects = [];
    for (const index in projects) {
        const workshop = projects[index];
        formattedProjects.push(<Workshop
            id={workshop.title}
            title={workshop.title}
            buttonName={workshop.buttonName}
            description={workshop.description}
            imgSrc={workshop.imgSrc}
            alt={workshop.alt}
            downloadFile={fileList[workshop.id]}
            downloadFilename={workshop.filename}
        />);
    }
    return formattedProjects;
}