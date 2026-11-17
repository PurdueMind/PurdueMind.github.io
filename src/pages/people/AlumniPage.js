import { Link } from 'react-router-dom';

import './AlumniPage.css';
import '../../App.css';

import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import { buildImageMap } from '../../utils/images';

import defaultHeadshot from '../../assets/people/default.png';

const { alumni } = require('./alumniBios.json');

// Alumni headshots live in src/assets/people/alumni
const alumniImages = buildImageMap(require.context('../../assets/people/alumni', false, /\.(png|jpe?g)$/));

export default function AlumniPage() {
  return (
    <div className='alumniPage'>
      <PageHero eyebrow='People · Alumni' title='Alumni'>
        <p className='heroBody'>Former MIND members on what the club meant to them and where they have gone since.</p>
        <div className='heroActions'>
          <Link className='button buttonGhost' to='/People'>← Current members</Link>
        </div>
      </PageHero>

      <section className='section container'>
        <SectionHeader index='01' title='Alumni Spotlights' meta={`${alumni.length} alumni`} />
        <div className='alumniBioList'>
          {alumni.map((person) => (
            <article className='alumniBio' key={person.name}>
              <img
                className='alumniBioPhoto'
                src={alumniImages[person.filename] || defaultHeadshot}
                alt={person.name} />
              <div className='alumniBioBody'>
                <div className='alumniBioHeader'>
                  <h3 className='alumniBioName'>{person.name}</h3>
                  <span className='alumniBioYear'>Class of {person.classYear}</span>
                </div>
                <dl className='alumniBioFacts'>
                  <div><dt>Role in MIND</dt><dd>{person.role}</dd></div>
                  <div><dt>Major</dt><dd>{person.major}</dd></div>
                  <div><dt>Now</dt><dd>{person.now}</dd></div>
                </dl>
                <blockquote className='alumniBioQuote'>
                  {person.quote.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
