import { useEffect, useRef } from 'react';

// Auto-scroll speed in px per second
const SCROLL_SPEED = 28;

// How long the rows stay still after a touch or swipe on a phone. With a mouse
// the rows only pause while hovered and resume as soon as the cursor leaves.
const RESUME_AFTER_MS = 2200;

// Rows of items that scroll by themselves in alternating directions but are
// real scroll containers, so visitors can swipe through them. Touch pauses
// every row until RESUME_AFTER_MS of quiet; a mouse pauses them only while
// hovering.
// Each row's items are rendered twice so it loops seamlessly in both
// directions.
export default function AlumniMarquee({ rows, renderItem }) {
  const rowRefs = useRef([]);
  const positions = useRef([]);
  const lastInteraction = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only devices with a real mouse pause on hover; on touch screens :hover
    // can stick after a tap, which would freeze the rows
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // One loop's length: the first copy of the items plus the gap after it
    const loopLength = (el) => {
      const gap = parseFloat(getComputedStyle(el.firstElementChild).columnGap) || 0;
      return (el.firstElementChild.scrollWidth + gap) / 2;
    };

    // Reverse rows start halfway so they have room to move right immediately
    rowRefs.current.forEach((el, row) => {
      if (!el) return;
      const start = row % 2 ? loopLength(el) : 0;
      el.scrollLeft = start;
      positions.current[row] = start;
    });

    if (reduceMotion) return undefined;

    let frame;
    let previous = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      const hovered = canHover && containerRef.current && containerRef.current.matches(':hover');
      const paused = hovered || now - lastInteraction.current < RESUME_AFTER_MS;

      rowRefs.current.forEach((el, row) => {
        if (!el) return;
        if (paused) {
          // Pick up from wherever the visitor left the row
          positions.current[row] = el.scrollLeft;
          return;
        }
        const length = loopLength(el);
        let pos = positions.current[row] + (row % 2 ? -1 : 1) * SCROLL_SPEED * dt;
        if (pos >= length) pos -= length;
        if (pos < 0) pos += length;
        positions.current[row] = pos;
        el.scrollLeft = pos;
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rows.length]);

  const markTouch = () => {
    lastInteraction.current = performance.now();
  };

  // Keep manual scrolling looping too, by jumping one copy's length when the
  // visitor nears either end
  const handleScroll = (row) => () => {
    const el = rowRefs.current[row];
    const gap = parseFloat(getComputedStyle(el.firstElementChild).columnGap) || 0;
    const length = (el.firstElementChild.scrollWidth + gap) / 2;
    if (el.scrollLeft >= length) el.scrollLeft -= length;
    else if (el.scrollLeft <= 0) el.scrollLeft += length;
  };

  return (
    <div
      className='alumniMarquee'
      ref={containerRef}
      onPointerDown={(e) => { if (e.pointerType !== 'mouse') markTouch(); }}
      onTouchStart={markTouch}
      onTouchMove={markTouch}
    >
      {rows.map((items, row) => (
        <div
          className='alumniRow'
          key={row}
          ref={(el) => { rowRefs.current[row] = el; }}
          onScroll={handleScroll(row)}
        >
          <div className='alumniTrack'>
            {[...items, ...items].map((item, i) => renderItem(item, i, i >= items.length))}
          </div>
        </div>
      ))}
    </div>
  );
};
