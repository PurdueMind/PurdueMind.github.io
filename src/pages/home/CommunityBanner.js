import { useEffect, useState } from 'react';

import './CommunityBanner.css';

const SLIDE_INTERVAL_MS = 5500;

// Photos much taller or wider than the frame would lose too much to a crop
// (heads, feet, the subject itself), so they're shown whole over a blurred
// copy of themselves instead. Photos in between fill the frame.
const FILL_MIN_ASPECT = 1.2;
const FILL_MAX_ASPECT = 1.9;

// Framed band: the page's content (slogan, call to action) on a black panel
// at left, and a crossfading photo frame at right that fades into the panel.
// Every photo stays mounted so each fade is between two loaded images.
export default function CommunityBanner({ images, children }) {
  const [index, setIndex] = useState(0);
  const [aspects, setAspects] = useState({});

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [images.length]);

  const recordAspect = (src) => (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setAspects((prev) => ({ ...prev, [src]: naturalWidth / naturalHeight }));
  };

  return (
    <div className='communityBanner'>
      <div className='communityBannerContent'>
        {children}
      </div>

      <div className='communityBannerFrame' aria-hidden='true'>
        {images.map((src, i) => {
          const aspect = aspects[src] || 1.5;
          const fill = aspect >= FILL_MIN_ASPECT && aspect <= FILL_MAX_ASPECT;
          return (
            <div
              key={src}
              className={`communityBannerSlide ${i === index ? 'communityBannerSlideActive' : ''}`}
            >
              {!fill && <img className='communityBannerBackdrop' src={src} alt='' />}
              <img
                className={`communityBannerPhoto ${fill ? 'communityBannerPhotoFill' : 'communityBannerPhotoFit'}`}
                src={src}
                alt=''
                onLoad={recordAspect(src)}
              />
            </div>
          );
        })}

        <div className='communityBannerShade' />

        {images.length > 1 &&
          <div className='communityBannerTicks'>
            {images.map((src, i) => (
              <span key={src} className={`communityBannerTick ${i === index ? 'communityBannerTickActive' : ''}`} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};
