import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const NAVBAR_HEIGHT = 72;

// Scroll to the section named in the URL hash (e.g. #calendarBreak), or to
// the top of the page when navigating here with no hash.
export default function useHashScroll() {
  const location = useLocation();

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
}
