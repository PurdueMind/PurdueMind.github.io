import { Link } from 'react-router-dom';

import './LearningPage.css';
import '../../App.css';
import Workshop from './Workshop';

import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import Slideshow from '../../components/Slideshow';
import useHashScroll from '../../hooks/useHashScroll';
import { buildImageMap } from '../../utils/images';

import arduinoFile from '../../assets/learning/Arduino-Onboarding.pdf';
import cadFiles from '../../assets/learning/CAD-Onboarding.pdf';
import spiceFiles from '../../assets/learning/LTSpice-Onboarding.pdf';

const workshopList = require('./workshopList.json');

const fileList = {
    'arduino-project': arduinoFile,
    'cad-project': cadFiles,
    'ltspice-project': spiceFiles,
}

// Onboarding project images live in src/assets/learning/onboarding; new ones
// just need to be dropped in without touching this file.
const onboardingImages = buildImageMap(require.context('../../assets/learning/onboarding', false, /\.(png|jpe?g)$/));

function getImageSrc(filename) {
    return onboardingImages[filename] || onboardingImages['defaultImg.jpg'];
}

// Slideshow of workshop photos shown next to the description
const slideshowImages = Object.values(buildImageMap(require.context('../../assets/learning/slideshow', false, /\.(png|jpe?g)$/)));

const STEPS = [
    { title: 'Attend', body: 'For the first month of the fall semester, MIND hosts meetings dedicated to working through the onboarding projects.' },
    { title: 'Complete', body: 'Anyone interested in joining a project team then finishes the projects on their own time.' },
    { title: 'Join a team', body: 'Once the projects are done, you are ready to contribute to a MIND project team.' },
];

export default function OnboardingPage() {
    useHashScroll();

    return (
        <div className='OnboardingPage'>
            <PageHero eyebrow='Learning · Skills' title='Onboarding & Workshops'>
                <p className='heroBody'>Hands-on projects that give new members the skills they need to contribute to project teams.</p>
            </PageHero>

            <section className='section container'>
                <div className='learningIntro'>
                    <Slideshow images={slideshowImages} alt='Workshop preview' caption='Fig. 01 — Workshop session' height={320} />
                    <div className='learningIntroText'>
                        <ol className='learningSteps'>
                            {STEPS.map((step, i) => (
                                <li key={step.title}>
                                    <span className='learningStepIndex'>{String(i + 1).padStart(2, '0')}</span>
                                    <div>
                                        <h3 className='learningStepTitle'>{step.title}</h3>
                                        <p>{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className='learningNote'>
                            Already have the skills outlined in a workshop? Click <b>"I know what I'm doing"</b> to submit a project you've
                            done that demonstrates similar skills. Please <Link to={{ pathname: '/People', hash: '#officersBreak' }}>reach out</Link> if
                            you have any questions.
                        </p>
                    </div>
                </div>
            </section>

            <section className='section container learningSectionFollow'>
                <SectionHeader id='onboardingBreak' index='01' title='Onboarding' meta={`${workshopList.onboarding.length} projects`} />
                <div className='workshopGrid'>
                    {getProjects(workshopList.onboarding)}
                </div>
            </section>

            <section className='section container learningSectionFollow'>
                <SectionHeader id='workshopsBreak' index='02' title='Workshops' meta={`${workshopList.workshops.length} scheduled`} />
                {workshopList.workshops.length > 0 &&
                    <div className='workshopGrid'>
                        {getProjects(workshopList.workshops)}
                    </div>
                }
                <div className='workshopsComingSoon'>More workshops coming soon.</div>
            </section>
        </div>
    );
};

function getProjects(projects) {
    return projects.map((workshop, i) => (
        <Workshop
            key={workshop.id}
            id={workshop.title}
            index={i + 1}
            title={workshop.title}
            pitch={workshop.pitch}
            dates={workshop.dates}
            imgSrc={getImageSrc(workshop.imgSrc)}
            alt={workshop.alt || workshop.title}
            downloadFile={fileList[workshop.id]}
            downloadFilename={workshop.filename}
        />
    ));
}
