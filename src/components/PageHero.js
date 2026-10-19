import '../App.css';

export default function PageHero({ eyebrow, title, children }) {
  return (
    <header className='pageHero'>
      <div className='container'>
        {eyebrow && <div className='heroEyebrow'>{eyebrow}</div>}
        <h1 className='heroTitle'>{title}</h1>
        {children}
      </div>
    </header>
  );
};
