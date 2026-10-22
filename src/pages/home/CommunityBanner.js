import { useEffect, useRef, useState } from 'react';

import './CommunityBanner.css';

const SLIDE_INTERVAL_MS = 5500;

// Horizontal drag distance (px) that counts as a swipe rather than a tap
const SWIPE_THRESHOLD = 40;

// Photos much taller or wider than the frame would lose too much to a crop
// (heads, feet, the subject itself), so they're shown whole over a blurred
// copy of themselves instead.
// Photos in between fill the frame.
const FILL_MIN_ASPECT = 1.2;
const FILL_MAX_ASPECT = 1.9;

// Framed band: the page's content (slogan, call to action) on a black panel
// at left, and a crossfading photo frame at right that fades into the panel.
// Every photo stays mounted so each fade is between two loaded images.
// Photos can be swiped (or dragged) and the bars pick a photo directly.
export default function CommunityBanner({ images, children }) {
  const [index, setIndex] = useState(0);
  const [aspects, setAspects] = useState({});
  const swipeStartX = useRef(null);

  // Restarting on every index change means a manual pick or swipe gets the
  // full interval before auto-advance moves on.
  useEffect(() => {
    if (images.length < 2) return;
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [index, images.length]);

  const step = (delta) => {
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  const handlePointerDown = (e) => {
    swipeStartX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) step(dx < 0 ? 1 : -1);
  };

  const recordAspect = (src) => (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setAspects((prev) => ({ ...prev, [src]: naturalWidth / naturalHeight }));
  };

  return (
    <div className='communityBanner'>
      <div className='communityBannerContent'>
        {children}
      </div>

      <div
        className='communityBannerFrame'
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { swipeStartX.current = null; }}
      >
        <div aria-hidden='true'>
          {images.map((src, i) => {
            const aspect = aspects[src] || 1.5;
            const fill = aspect >= FILL_MIN_ASPECT && aspect <= FILL_MAX_ASPECT;
            return (
              <div
                key={src}
                className={`communityBannerSlide ${i === index ? 'communityBannerSlideActive' : ''}`}
              >
                {!fill && <img className='communityBannerBackdrop' src={src} alt='' draggable='false' />}
                <img
                  className={`communityBannerPhoto ${fill ? 'communityBannerPhotoFill' : 'communityBannerPhotoFit'}`}
                  src={src}
                  alt=''
                  draggable='false'
                  onLoad={recordAspect(src)}
                />
              </div>
            );
          })}

          <div className='communityBannerShade' />
        </div>

        {images.length > 1 &&
          <div className='communityBannerTicks'>
            {images.map((src, i) => (
              <button
                type='button'
                key={src}
                className={`communityBannerTick ${i === index ? 'communityBannerTickActive' : ''}`}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-current={i === index}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
};
