import { buildImageMap } from './images';

// Images for pages visitors usually click into next: project detail pages and
// the Learning page. Fetching them in the background means those pages show
// their images immediately instead of loading them in on arrival.
const PRELOAD_GROUPS = [
  buildImageMap(require.context('../assets/projects/detailed', false, /\.(png|jpe?g)$/)),
  buildImageMap(require.context('../assets/projects/main', false, /\.(png|jpe?g)$/)),
  buildImageMap(require.context('../assets/learning/onboarding', false, /\.(png|jpe?g)$/)),
  buildImageMap(require.context('../assets/learning/workshops', false, /\.(png|jpe?g)$/)),
  buildImageMap(require.context('../assets/learning/slideshow', false, /\.(png|jpe?g)$/)),
];

// A couple at a time, so preloading never competes with the current page
const CONCURRENCY = 2;

const whenIdle = (fn) => (window.requestIdleCallback
  ? window.requestIdleCallback(fn, { timeout: 3000 })
  : setTimeout(fn, 1500));

export default function preloadImages() {
  // Respect data-saver mode on phones
  if (navigator.connection && navigator.connection.saveData) return;

  const queue = [...new Set(PRELOAD_GROUPS.flatMap((group) => Object.values(group)))];

  const next = () => {
    const src = queue.shift();
    if (!src) return;
    const img = new Image();
    img.onload = img.onerror = next;
    img.src = src;
  };

  const start = () => whenIdle(() => {
    for (let i = 0; i < CONCURRENCY; i++) next();
  });

  // Wait until the current page has fully loaded before starting
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
