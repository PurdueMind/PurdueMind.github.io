import { useEffect, useState } from 'react';

import './CommunityBanner.css';

const SLIDE_INTERVAL_MS = 5500;

// Full-width photo band that crossfades between images, with the page's
// content (slogan, call to action) laid over a dark gradient on the left.
// Every photo stays mounted so each fade is between two loaded images.
export default function CommunityBanner({ images, children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='communityBanner'>
      <div className='communityBannerPhotos' aria-hidden='true'>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=''
            className={`communityBannerPhoto ${i === index ? 'communityBannerPhotoActive' : ''}`}
          />
        ))}
      </div>

      <div className='communityBannerShade' />

      <div className='container communityBannerContent'>
        {children}
      </div>

      {images.length > 1 &&
        <div className='container communityBannerTicks' aria-hidden='true'>
          {images.map((src, i) => (
            <span key={src} className={`communityBannerTick ${i === index ? 'communityBannerTickActive' : ''}`} />
          ))}
        </div>
      }
    </div>
  );
};
