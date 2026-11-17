import { useLayoutEffect, useRef, useState } from 'react';
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
        <SectionHeader index='01' title='Alumni Spotlights' />
        <div className='alumniBioList'>
          {alumni.map((person) => (
            <AlumniBio key={person.name} person={person} />
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

// Shortest a collapsed quote gets, so it always shows a few lines
const MIN_QUOTE_HEIGHT = 48;
// On phones the photo sits above the text, so cap the quote at a fixed height
const MOBILE_QUOTE_HEIGHT = 170;

// One spotlight card. A quote too long to fit beside the photo is cut off
// with a fade and a "Read more" toggle, so the card stays the photo's height.
function AlumniBio({ person }) {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(null);
  const photoRef = useRef(null);
  const bodyRef = useRef(null);
  const quoteRef = useRef(null);
  const toggleRef = useRef(null);

  useLayoutEffect(() => {
    const measure = () => {
      const photo = photoRef.current;
      const body = bodyRef.current;
      const quote = quoteRef.current;
      if (!photo || !body || !quote) return;

      const stacked = window.matchMedia('(max-width: 700px)').matches;
      const style = getComputedStyle(body);
      const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const gap = parseFloat(style.rowGap) || 0;
      const toggleHeight = (toggleRef.current ? toggleRef.current.offsetHeight : 20) + gap;

      // Space the rest of the card uses besides the quote
      const others = [...body.children]
        .filter((el) => el !== quote && el !== toggleRef.current)
        .reduce((sum, el) => sum + el.offsetHeight + gap, 0);

      const available = stacked
        ? MOBILE_QUOTE_HEIGHT
        : Math.max(MIN_QUOTE_HEIGHT, photo.offsetHeight - padding - others - toggleHeight);

      setMaxHeight(quote.scrollHeight > available + 4 ? available : null);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(photoRef.current);
    observer.observe(bodyRef.current);
    return () => observer.disconnect();
  }, []);

  const collapsible = maxHeight !== null;
  const collapsed = collapsible && !expanded;

  return (
    <article className='alumniBio'>
      <div className='alumniBioPhotoCol'>
        <img
          ref={photoRef}
          className='alumniBioPhoto'
          src={alumniImages[person.filename] || defaultHeadshot}
          alt={person.name} />
      </div>
      <div className='alumniBioBody' ref={bodyRef}>
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
        <blockquote
          ref={quoteRef}
          className={`alumniBioQuote ${collapsed ? 'alumniBioQuoteCollapsed' : ''}`}
          style={collapsed ? { maxHeight } : undefined}
        >
          {person.quote.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </blockquote>
        {collapsible &&
          <button
            ref={toggleRef}
            type='button'
            className='alumniBioToggle'
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? 'Show less ↑' : 'Read more ↓'}
          </button>
        }
      </div>
    </article>
  );
}
