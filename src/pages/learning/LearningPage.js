import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './LearningPage.css';
import '../../App.css';
import Workshop from './Workshop';

import arduinoFile from '../../assets/learning/Arduino-Onboarding.pdf';
// import cadFiles from '../../assets/learning/cad-workshop-2025.zip';
// import electronicsFiles from '../../assets/learning/Electronics-Onboarding.pdf';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const workshopList = require('./workshopList.json');

const fileList = {
    'arduino-project': arduinoFile,
    // 'cad': cadFiles,
    // 'electronics': electronicsFiles,
}

// Onboarding project images live in src/assets/learning/onboarding; new ones
// just need to be dropped in without touching this file.
const onboardingImageContext = require.context('../../assets/learning/onboarding', false, /\.(png|jpe?g)$/);

const onboardingImages = {};
onboardingImageContext.keys().forEach((key) => {
    const mod = onboardingImageContext(key);
    onboardingImages[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
});

function getImageSrc(filename) {
    return onboardingImages[filename] || onboardingImages['defaultImg.jpg'];
}

// Slideshow of workshop photos shown next to the description
const slideshowContext = require.context('../../assets/learning/slideshow', false, /\.(png|jpe?g)$/);

const slideshowImageMap = {};
slideshowContext.keys().forEach((key) => {
    const mod = slideshowContext(key);
    slideshowImageMap[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
});
const slideshowImages = Object.values(slideshowImageMap);

const IMAGE_SLIDE_INTERVAL_MS = 4500;
const IMAGE_SLIDE_ANIMATION_MS = 800;

const NAVBAR_HEIGHT = 90;

export default function OnboardingPage() {
    const location = useLocation();

    const [imageIndex, setImageIndex] = useState(0);
    const [prevImageIndex, setPrevImageIndex] = useState(null);

    // Scroll to the section named in the URL hash (e.g. #teamLeads), or
    // to the top of the page when navigating here with no hash.
    useEffect(() => {
        if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    useEffect(() => {
        if (slideshowImages.length === 0) return;
        const interval = setInterval(() => {
            setImageIndex((i) => {
                setPrevImageIndex(i);
                return (i + 1) % slideshowImages.length;
            });
        }, IMAGE_SLIDE_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    // Drop the outgoing image from the DOM once its slide-out animation finishes
    useEffect(() => {
        if (prevImageIndex === null) return;
        const timeout = setTimeout(() => setPrevImageIndex(null), IMAGE_SLIDE_ANIMATION_MS);
        return () => clearTimeout(timeout);
    }, [prevImageIndex]);

    return (
        <div className='OnboardingPage'>
            <div className='majorTitleDiv'>
                <h1 className='majorTitle' id='onboardingTitle'>Onboarding & Workshops</h1>
            </div>

            <div className='learningDescriptionDiv'>
                <div className='learningDescriptionLeftDiv'>
                    {slideshowImages.length > 0 && (
                        <div className='learningImageSlideshow'>
                            {prevImageIndex !== null && (
                                <div key={`prev-${prevImageIndex}`} className='learningImageSlideshowSlide learningImageSlideshowSlideOut'>
                                    <img className='learningImageSlideshowBg' src={slideshowImages[prevImageIndex]} alt='' aria-hidden='true' />
                                    <img className='learningImageSlideshowImg' src={slideshowImages[prevImageIndex]} alt='' />
                                </div>
                            )}
                            <div key={`current-${imageIndex}`} className='learningImageSlideshowSlide learningImageSlideshowSlideIn'>
                                <img className='learningImageSlideshowBg' src={slideshowImages[imageIndex]} alt='' aria-hidden='true' />
                                <img className='learningImageSlideshowImg' src={slideshowImages[imageIndex]} alt='Workshop preview' />
                            </div>
                        </div>
                    )}
                </div>
                <div className='learningDescriptionRightDiv'>
                    <h3 id='learningDescription'>
                        The MIND onboarding projects are aimed to help new members gain the necessary skills to contribute to project teams.
                        For the first month of the fall semester, MIND will host meetings dedicated to help members work through these projects.
                        After these meetings, anyone interested in joining will need to work through the projects on their own time before joining a project team.
                        If you already have the skills outlined in any of the workshops, click "I know what I'm doing" to be brought to a Google form where you can show another project that you've done accomplishing similar skills.
                        Please <Link to={{ pathname: '/People', hash: '#officersBreak' }} id='learningReachOutLink'>reach out</Link> if you have any questions
                    </h3>
                </div>
            </div>

            <div className='break'/>

            <div className='sectionTitleDiv' id='onboardingBreak'>
                <div className='sectionTitleLeftDiv'>
                    <h1 className='sectionTitle'>Onboarding</h1>
                </div>
                <div className='sectionTitleRightDiv'/>
            </div>

            <div className='onboardingContainer'>
                {getProjects(workshopList.onboarding)}
            </div>

            <div className='smallBreak'/>

            <div className='sectionTitleDiv' id='workshopsBreak'>
                <div className='sectionTitleLeftDiv'>
                    <h1 className='sectionTitle'>Workshops</h1>
                </div>
                <div className='sectionTitleRightDiv'/>
            </div>

            <div className='onboardingContainer'>
                {getProjects(workshopList.workshops)}
            </div>

            <h1 id='workshopsComingSoon'>Coming Soon!</h1>
        </div>
    );
};

function getProjects(projects) {
    const formattedProjects = [];
    for (const index in projects) {
        const workshop = projects[index];
        formattedProjects.push(<Workshop
            id={workshop.title}
            pitch={workshop.pitch}
            dates={workshop.dates}
            buttonName={workshop.buttonName}
            description={workshop.description}
            imgSrc={getImageSrc(workshop.imgSrc)}
            alt={workshop.alt}
            downloadFile={fileList[workshop.id]}
            downloadFilename={workshop.filename}
        />);
    }
    return formattedProjects;
}