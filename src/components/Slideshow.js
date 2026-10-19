import { useEffect, useState } from 'react';

import './Slideshow.css';

const SLIDE_INTERVAL_MS = 4500;
const SLIDE_ANIMATION_MS = 800;

// Framed photo slideshow with a "FIG." caption bar and a frame counter.
// Each slide shows the photo uncropped over a blurred copy of itself, so
// photos of any aspect ratio fill the same frame.
export default function Slideshow({ images, alt = '', caption, height = 360, maxWidth }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => {
        setPrevIndex(i);
        return (i + 1) % images.length;
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [images.length]);

  // Drop the outgoing image from the DOM once its slide-out animation finishes
  useEffect(() => {
    if (prevIndex === null) return;
    const timeout = setTimeout(() => setPrevIndex(null), SLIDE_ANIMATION_MS);
    return () => clearTimeout(timeout);
  }, [prevIndex]);

  if (images.length === 0) return null;

  const pad = (n) => String(n).padStart(2, '0');

  // A single photo doesn't need the fixed frame: show it at its own aspect
  if (images.length === 1) {
    return (
      <figure className='figure slideshow' style={{ maxWidth, marginInline: 'auto' }}>
        <img className='slideshowSingle' src={images[0]} alt={alt} />
        <figcaption className='figureCaption'>
          <span>{caption}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className='figure slideshow' style={{ maxWidth, marginInline: 'auto' }}>
      <div className='slideshowFrame' style={{ height }}>
        {prevIndex !== null && (
          <div key={`prev-${prevIndex}`} className='slideshowSlide slideshowSlideOut'>
            <img className='slideshowBg' src={images[prevIndex]} alt='' aria-hidden='true' />
            <img className='slideshowImg' src={images[prevIndex]} alt='' />
          </div>
        )}
        <div key={`current-${index}`} className={`slideshowSlide ${prevIndex !== null ? 'slideshowSlideIn' : ''}`}>
          <img className='slideshowBg' src={images[index]} alt='' aria-hidden='true' />
          <img className='slideshowImg' src={images[index]} alt={alt} />
        </div>
      </div>
      <figcaption className='figureCaption'>
        <span>{caption}</span>
        <span>{pad(index + 1)} / {pad(images.length)}</span>
      </figcaption>
    </figure>
  );
};
