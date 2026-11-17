import { Link } from 'react-router-dom';

import './AlumniPage.css';
import '../../App.css';

import PageHero from '../../components/PageHero';
import SectionHeader from '../../components/SectionHeader';
import useHashScroll from '../../hooks/useHashScroll';
import { buildImageMap } from '../../utils/images';

import defaultHeadshot from '../../assets/people/default.png';

const { alumni } = require('./alumniBios.json');
const { boards } = require('./pastBoards.json');

// Alumni headshots live in src/assets/people/alumni
const alumniImages = buildImageMap(require.context('../../assets/people/alumni', false, /\.(png|jpe?g)$/));

export default function AlumniPage() {
  useHashScroll();

  return (
    <div className='alumniPage'>
      <PageHero eyebrow='People · Alumni' title='Alumni'>
        <p className='heroBody'>Former MIND members on what the club meant to them.</p>
        <div className='heroActions'>
          <Link className='button buttonGhost' to='/People'>← Current members</Link>
        </div>
      </PageHero>

      <section className='section container'>
        <SectionHeader index='01' title='Alumni Spotlights' meta={`${alumni.length} alumni`} />
        <div className='alumniBioList'>
          {alumni.map((person) => (
            <article className='alumniBio' key={person.name}>
              <div className='alumniBioPhotoCol'>
                <img
                  className='alumniBioPhoto'
                  src={alumniImages[person.filename] || defaultHeadshot}
                  alt={person.name} />
              </div>
              <div className='alumniBioBody'>
                <div className='alumniBioHeader'>
                  <h3 className='alumniBioName'>{person.name}</h3>
                  <span className='alumniBioYear'>Class of {person.classYear}</span>
                  {person.linkedIn &&
                    <a className='alumniBioLinkedIn' href={person.linkedIn} target='_blank' rel='noreferrer'>LinkedIn ↗</a>
                  }
                </div>
                <dl className='alumniBioFacts'>
                  <div><dt>Role in MIND</dt><dd>{person.role}</dd></div>
                  <div><dt>Major</dt><dd>{person.major}</dd></div>
                </dl>
                <blockquote className='alumniBioQuote'>
                  {person.quote.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='section container alumniSectionFollow'>
        <SectionHeader id='pastBoards' index='02' title='Past Executive Boards' meta={`${boards[boards.length - 1].year.slice(0, 4)}–${boards[0].year.slice(-4)}`} />
        <div className='pastBoardGrid'>
          {boards.map((board) => (
            <div className='pastBoard' key={board.year}>
              <h3 className='pastBoardYear'>{board.year}</h3>
              <dl className='pastBoardList'>
                {board.members.map((member) => (
                  <div key={`${member.role}-${member.name}`}>
                    <dt>{member.role}</dt>
                    <dd>
                      {member.linkedIn
                        ? <a href={member.linkedIn} target='_blank' rel='noreferrer'>{member.name}</a>
                        : member.name}
                    </dd>
                  </div>
                ))}
                {board.seniorMentors &&
                  <div>
                    <dt>Senior Mentors</dt>
                    <dd>{board.seniorMentors.join(', ')}</dd>
                  </div>
                }
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
