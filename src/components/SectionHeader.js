import '../App.css';

// Numbered section heading, e.g. "01  Executive Board  ——  7 members".
// `id` is used as a scroll target by the navbar's dropdown links.
export default function SectionHeader({ id, index, title, meta }) {
  return (
    <div className='sectionHeader' id={id}>
      {index && <span className='sectionIndex'>{index}</span>}
      <h2 className='sectionTitle'>{title}</h2>
      {meta && <span className='sectionMeta'>{meta}</span>}
    </div>
  );
};
