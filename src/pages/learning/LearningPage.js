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
const travelList = require('./travelList.json');

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

// Trip photos live in src/assets/learning/travel/<trip id>/, shown in filename
// order, so photos can be added without touching this file
const travelImageContext = require.context('../../assets/learning/travel', true, /\.(png|jpe?g)$/i);
const travelImages = travelImageContext.keys().sort().reduce((byTrip, key) => {
    const [, tripId] = key.split('/');
    const mod = travelImageContext(key);
    (byTrip[tripId] = byTrip[tripId] || []).push(mod && mod.default ? mod.default : mod);
    return byTrip;
}, {});

const STEPS = [
    { title: 'Attend', body: 'For the first month of the fall semester, MIND hosts meetings dedicated to working through the onboarding projects.' },
    { title: 'Complete', body: 'Anyone interested in joining a project team then finishes the projects on their own time.' },
    { title: 'Join a team', body: 'Once the projects are done, you are ready to contribute to a MIND project team.' },
];

export default function OnboardingPage() {
    useHashScroll();

    return (
        <div className='OnboardingPage'>
            <PageHero eyebrow='Learning · Skills' title='Onboarding, Workshops & Travel'>
                <p className='heroBody'>Hands-on projects that give new members the skills they need to contribute to project teams, plus trips that take members to the wider medtech world.</p>
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

            <section className='section container learningSectionFollow'>
                <SectionHeader id='travelBreak' index='03' title='Travel' meta={`${travelList.trips.length} trips`} />
                <div className='travelList'>
                    {travelList.trips.map((trip) => (
                        <article className='travelTrip' key={trip.id}>
                            {(travelImages[trip.id] || []).length > 0 &&
                                <Slideshow
                                    images={travelImages[trip.id]}
                                    alt={`MIND at ${trip.title}`}
                                    caption={`${trip.location} · ${trip.date}`}
                                    height={340} />
                            }
                            <div className='travelTripText'>
                                <div className='travelTripMeta'>
                                    <span>{trip.date}</span>
                                    <span>{trip.location}</span>
                                    {trip.sponsor && <span className='travelTripSponsor'>Sponsored by {trip.sponsor}</span>}
                                </div>
                                <h3 className='travelTripTitle'>{trip.title}</h3>
                                {trip.award && <div className='travelTripAward'>{trip.award}</div>}
                                <p>{trip.summary}</p>
                                {trip.project &&
                                    <Link className='travelTripLink' to={`/Projects/${trip.project.slug}`}>See the {trip.project.title} project →</Link>
                                }
                            </div>
                        </article>
                    ))}
                </div>
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
